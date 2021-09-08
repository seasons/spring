import React, { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, Box, TextField, Typography } from "@material-ui/core"
import { DialogTitle } from "components"
import { head, trim, groupBy } from "lodash"
import { PhysicalProduct } from "generated/PhysicalProduct"
import { useQuery, useLazyQuery } from "react-apollo"
import { useHistory } from "react-router-dom"
import { PHYSICAL_PRODUCT_BARCODE_REGEX } from "views/constants"
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
    if (resData) {
      const reservations = resData?.physicalProduct?.reservations
      if (reservations.length > 0) {
        const resID = reservations[0].id
        history.push(`/reservation/${resID}/overview`)
      }
    }
  })

  useEffect(() => {
    if (resysByTrackingNumber) {
      const reservations = resysByTrackingNumber?.reservations
      if (reservations.length > 0) {
        const resID = reservations[0].id
        history.push(`/reservation/${resID}/overview`)
      }
    }
  })

  const inputRef = useRef()

  const focusOnInput = () => {
    const target: any = inputRef?.current
    target?.focus()
  }

  const handleBarcodeChange = async e => {
    const input = trim(e.target.value)

    // All UPS tracking numbers in our system begin with "1Z7"
    if (/^1Z7/.test(input)) {
      // this is a tracking number
      // Get most recent resy where sent or returned package containaed that tracking number
      getReservationsForTrackingNumber({ variables: { trackingNumber: input } })
    } else {
      // this is a barcode
      // 1. Translate barcode to product ID
      const physicalProduct = head(physicalProductsByBarcode[input]) as any
      setBarcodeOrTrackingNumber(input)

      // 2. Get most recent resy for that product
      getReservationsForProduct({ variables: { id: physicalProduct.id, orderBy: "createdAt_DESC" } })

      if (!selectedPhysicalProduct && input.match(PHYSICAL_PRODUCT_BARCODE_REGEX)) {
        setSelectedPhysicalProduct(head(physicalProductsByBarcode[input]))
        setBarcodeOrTrackingNumber("")
      }
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
