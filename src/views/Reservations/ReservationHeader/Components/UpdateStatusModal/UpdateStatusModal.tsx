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
  const [statusBeingSet, setStatusBeingSet] = useState(null)

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
    setStatusBeingSet(selectedValue)
    if (["Lost", "Cancelled"].includes(selectedValue) && selectedValue !== reservation.status) {
      setShowStatusUpdateDetail(true)
    } else if (showStatusUpdateDetail) {
      setShowStatusUpdateDetail(false)
    }
  }

  const defaultStatusUpdateDetail = (
    <>
      <Text variant="body2">
        "Warning: Setting this status will also update related physical products, product variants, and bag items."
      </Text>
    </>
  )
  const alternativeStatusUpdateDetail = (
    <>
      <Text variant="body2">
        Warning: This reservation's items are on their way back and the customer has not filled out the return flow. If
        you mark it as Lost now, you'll need to manually update the relevant product statuses.
      </Text>
      <Spacer mt={1} />
      <Text variant="body2">
        If you either have the customer fill out their return flow or you manually return their bag items in the Admin
        before marking this as Lost, you can avoid that.
      </Text>
    </>
  )
  const useAlternativeStatusUpdateDetail =
    statusBeingSet === "Lost" &&
    reservation.phase === "CustomerToBusiness" &&
    reservation.returnedProducts?.length === 0
  const statusUpdateDetailComponent = (
    <>
      <Spacer mt={1} />
      {useAlternativeStatusUpdateDetail ? alternativeStatusUpdateDetail : defaultStatusUpdateDetail}
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
                  {showStatusUpdateDetail && statusUpdateDetailComponent}
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
