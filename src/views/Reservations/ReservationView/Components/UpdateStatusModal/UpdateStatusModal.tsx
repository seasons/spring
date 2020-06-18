import React, { useState } from "react"
import { Box, Button, Grid, Dialog, DialogContent, DialogActions, Typography } from "@material-ui/core"
import { useRefresh } from "@seasons/react-admin"
import { useMutation } from "react-apollo"
import { DialogTitle, Spacer, Text, Loader } from "components"
import { SelectField } from "fields"
import { SnackbarState } from "components/Snackbar"
import { UPDATE_RESERVATION } from "views/Reservations/mutations"
import { Form } from "react-final-form"

interface UpdateStatusModalProps {
  open: boolean
  toggleSnackbar: (state: SnackbarState) => void
  onClose?: () => void
  reservation: any
}

export const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({ open, toggleSnackbar, onClose, reservation }) => {
  const choices = [
    "Blocked",
    "Cancelled",
    "Completed",
    "Delivered",
    "Packed",
    "Queued",
    "Received",
    "Shipped",
    "Unknown",
  ].map(choice => ({ display: choice, value: choice }))

  const refresh = useRefresh()
  const [isMutating, setIsMutating] = useState(false)
  const [updateReservation] = useMutation(UPDATE_RESERVATION, {
    onCompleted: () => {
      toggleSnackbar({
        show: true,
        message: "Reservation status updated",
        status: "success",
      })
      refresh()
      onClose?.()
    },
    onError: error => {
      toggleSnackbar({
        show: true,
        message: error?.message,
        status: "error",
      })
    },
  })

  const onSubmit = async values => {
    setIsMutating(true)
    const result = await updateReservation({
      variables: {
        reservationNumber: reservation.reservationNumber,
        status: values.reservationStatus,
      },
    })
    setIsMutating(false)
  }

  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
        Update Reservation Status
      </DialogTitle>
      <Form initialValues={{ reservationStatus: reservation.status }} onSubmit={onSubmit}>
        {({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <DialogContent dividers>
                <Box my={2} width={["400px"]}>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Text variant="h6">Reservation status *</Text>
                      <Spacer mt={1} />
                      <SelectField name="reservationStatus" choices={choices} requiredString />
                    </Grid>
                  </Grid>
                </Box>
              </DialogContent>
              <DialogActions>
                <Box mr={1} my={1}>
                  <Button autoFocus type="submit" color="primary" variant="contained">
                    {isMutating ? <Loader size={20} /> : "Confirm"}
                  </Button>
                </Box>
              </DialogActions>
            </form>
          )
        }}
      </Form>
    </Dialog>
  )
}
