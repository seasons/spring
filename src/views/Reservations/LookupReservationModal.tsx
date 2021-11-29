import React, { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, Box, TextField, Typography, Input } from "@material-ui/core"
import { DialogTitle } from "components"
import { head, trim, groupBy } from "lodash"
import { PhysicalProduct } from "generated/PhysicalProduct"
import { useQuery, useLazyQuery } from "react-apollo"
import { useHistory } from "react-router-dom"
import { PHYSICAL_PRODUCT_BARCODE_REGEX, RETURN_LABEL_BARCODE_REGEX } from "views/constants"
import { PHYSICAL_PRODUCTS_WITH_WAREHOUSE_LOCATIONS_QUERY } from "views/Inventory/PhysicalProducts/queries"
import {
  GET_RESERVATIONS_FOR_PRODUCT_QUERY,
  GET_RESERVATIONS_FOR_TRACKING_NUMBER_QUERY,
} from "views/Reservations/queries"

interface LookupReservationModalProps {
  open: boolean
  onClose?: () => void
}

export const LookupReservationModal: React.FC<LookupReservationModalProps> = ({ open, onClose }) => {
  const history = useHistory()
  const { data, loading } = useQuery(PHYSICAL_PRODUCTS_WITH_WAREHOUSE_LOCATIONS_QUERY)
  const [getReservationsForProduct, { data: resData }] = useLazyQuery(GET_RESERVATIONS_FOR_PRODUCT_QUERY)

  const [getReservationsForTrackingNumber, { data: resysByTrackingNumber }] = useLazyQuery(
    GET_RESERVATIONS_FOR_TRACKING_NUMBER_QUERY
  )

  const [barcodeOrTrackingNumber, setBarcodeOrTrackingNumber] = useState("")
  const [selectedPhysicalProduct, setSelectedPhysicalProduct] = useState<PhysicalProduct | undefined>(undefined)
  const [physicalProductsByBarcode, setPhysicalProductsByBarcode] = useState({})

  useEffect(() => {
    if (!loading) {
      setPhysicalProductsByBarcode(groupBy(data?.physicalProducts, a => a.barcode))
    }
  }, [data, loading])

  useEffect(() => {
    const reservations = resData ? resData?.reservations : resysByTrackingNumber?.reservations
    if (reservations && reservations.length > 0) {
      const returnPendingReservation = reservations?.find(a => a.status === "ReturnPending")
      const resID = returnPendingReservation ? returnPendingReservation?.id : reservations[0].id
      history.push(`/reservation/${resID}/overview`)
    }
  }, [resysByTrackingNumber, resData])

  const inputRef = useRef()

  const focusOnInput = () => {
    const target: any = inputRef?.current
    target?.focus()
  }

  const handleBarcodeChange = async e => {
    const input = trim(e.target.value)

    if (input.match(RETURN_LABEL_BARCODE_REGEX)) {
      getReservationsForTrackingNumber({ variables: { trackingNumber: input } })
    } else if (input.match(PHYSICAL_PRODUCT_BARCODE_REGEX)) {
      const getSequenceNumber = input => {
        for (let i = 4; i <= input.length; i++) {
          if (input[i] > 0) {
            return parseInt(input.slice(i))
          }
        }
      }
      const sequenceNumber = getSequenceNumber(input)
      // 2. Get most recent resy for that product
      getReservationsForProduct({ variables: { sequenceNumber: sequenceNumber } })

      if (!selectedPhysicalProduct && input.match(PHYSICAL_PRODUCT_BARCODE_REGEX)) {
        setSelectedPhysicalProduct(head(physicalProductsByBarcode[input]))
        setBarcodeOrTrackingNumber("")
      }
    } else {
      setBarcodeOrTrackingNumber(input)
    }
  }

  useEffect(() => {
    const timeout = setTimeout(focusOnInput, 100)

    return () => {
      clearTimeout(timeout)
    }
  }, [open])

  const fullOnClose = () => {
    setSelectedPhysicalProduct(undefined)
    onClose?.()
  }
  return (
    <>
      <Dialog onClose={fullOnClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={fullOnClose}>
          <Typography variant="subtitle1">Lookup Reservation</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Box my={2}>
            <TextField
              label="Scan Barcode"
              helperText={`Click into box and scan the barcode of the ${
                !!selectedPhysicalProduct ? "warehouse location" : "product"
              }`}
              name="barcode"
              type="text"
              variant="outlined"
              onChange={handleBarcodeChange}
              value={barcodeOrTrackingNumber}
              inputRef={inputRef}
              fullWidth
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}
