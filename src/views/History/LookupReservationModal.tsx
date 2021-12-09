import React, { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, Box, TextField, Typography } from "@material-ui/core"
import { DialogTitle } from "components"
import { trim } from "lodash"
import { useLazyQuery } from "react-apollo"
import { useHistory } from "react-router-dom"
import { PHYSICAL_PRODUCT_BARCODE_REGEX, RETURN_LABEL_BARCODE_REGEX } from "views/constants"
import { GET_RESERVATIONS_FOR_PRODUCT_QUERY, GET_RESERVATIONS_FOR_TRACKING_NUMBER_QUERY } from "views/History/queries"
import { barcodeToSequenceNumber } from "views/Inventory/PhysicalProducts/utils"

interface LookupReservationModalProps {
  open: boolean
  onClose?: () => void
}

export const LookupReservationModal: React.FC<LookupReservationModalProps> = ({ open, onClose }) => {
  const history = useHistory()
  const [getReservationsForProduct, { data: resData }] = useLazyQuery(GET_RESERVATIONS_FOR_PRODUCT_QUERY)

  const [getReservationsForTrackingNumber, { data: resysByTrackingNumber }] = useLazyQuery(
    GET_RESERVATIONS_FOR_TRACKING_NUMBER_QUERY
  )

  const [barcodeOrTrackingNumber, setBarcodeOrTrackingNumber] = useState("")

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
      const sequenceNumber = barcodeToSequenceNumber(input)
      getReservationsForProduct({ variables: { sequenceNumber } })
      setBarcodeOrTrackingNumber(input)
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

  return (
    <>
      <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={onClose as any}>
          <Typography variant="subtitle1">Lookup Reservation</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Box my={2}>
            <TextField
              label="Scan barcode"
              helperText={`Click into box and scan the barcode of the product`}
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
