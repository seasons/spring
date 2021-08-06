import React, { useState } from "react"
import { Box, Button, Dialog, DialogContent, DialogActions } from "@material-ui/core"
import { DialogTitle, Spacer, Text, Loader } from "components"
import { SelectField } from "fields"
import { Form } from "react-final-form"

interface UpdateStatusModalProps {
  open: boolean
  onClose?: () => void
  onSubmit: (values) => void
  reservation: any
  isMutating: boolean
}

export const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({
  open,
  onSubmit,
  onClose,
  reservation,
  isMutating = false,
}) => {
  const [showStatusUpdateDetail, setShowStatusUpdateDetail] = useState(false)

  const choices = [
    "Queued",
    "Picked",
    "Packed",
    "Shipped",
    "Delivered",
    "Blocked",
    "Hold",
    "Completed",
    "Cancelled",
    "Lost",
  ].map(choice => ({
    display: choice,
    value: choice,
  }))

  const onChange = event => {
    const selectedValue = event.target.value
    if (["Lost", "Cancelled"].includes(selectedValue) && selectedValue !== reservation.status) {
      setShowStatusUpdateDetail(true)
    } else if (showStatusUpdateDetail) {
      setShowStatusUpdateDetail(false)
    }
  }

  const statusUpdateDetail = (
    <>
      <Spacer mt={1} />
      <Text variant="body2">
        Warning: Setting this status will also update related physical products, product variants, and bag items.
      </Text>
    </>
  )
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
                <Box my={2} width={["300px"]}>
                  <Text variant="h6">Reservation status *</Text>
                  <Spacer mt={1} />
                  <SelectField name="reservationStatus" choices={choices} requiredString onChange={onChange} />
                  {showStatusUpdateDetail && statusUpdateDetail}
                </Box>
              </DialogContent>
              <DialogActions>
                <Box mr={1} my={1}>
                  <Button autoFocus type="submit" color="primary" variant="contained">
                    {isMutating ? <Loader size={20} /> : "Save"}
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
