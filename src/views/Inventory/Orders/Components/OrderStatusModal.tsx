import React, { useState } from "react"

import { Button, Dialog, DialogContent, DialogActions, Box, DialogTitle, Select, MenuItem } from "@material-ui/core"
import { useSnackbarContext } from "components/Snackbar"
import gql from "graphql-tag"
import { useMutation } from "react-apollo"

const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($orderID: ID!, $status: OrderStatus!) {
    updateOrderStatus(orderID: $orderID, status: $status) {
      id
      status
    }
  }
`

interface OrderStatusModalProps {
  data: any
  open: boolean
  onSave?: () => void
  onClose?: () => void
}

export const OrderStatusModal: React.FC<OrderStatusModalProps> = ({ data, open, onSave, onClose }) => {
  const { showSnackbar } = useSnackbarContext()
  const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS, {
    onCompleted: () => {
      showSnackbar({
        message: "Order status updated",
        status: "success",
      })
    },
    onError: error => {
      showSnackbar({
        message: error?.message,
        status: "error",
      })
    },
  })
  const [status, setStatus] = useState<string>(data.status)

  const orderID = data?.order?.id

  const handleSave = async () => {
    await updateOrderStatus({
      variables: { orderID, status },
    })
    onClose?.()
  }

  return (
    <>
      <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title">Update Order Status</DialogTitle>
        <DialogContent dividers>
          <Box my={2} width={["550px"]}>
            <Box mb={4}>
              <Select
                label="Status"
                variant="outlined"
                value={status}
                onChange={event => {
                  setStatus(event.target.value as string)
                }}
                fullWidth
              >
                <MenuItem value="Drafted">Drafted</MenuItem>
                <MenuItem value="Submitted">Submitted</MenuItem>
                <MenuItem value="Fulfilled">Fulfilled</MenuItem>
                <MenuItem value="Hold">Hold</MenuItem>
                <MenuItem value="Returned">Returned</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
