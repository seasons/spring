import { Box, Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core"
import React from "react"

interface ConfirmationModalProps {
  open: boolean
  onClose: () => void
  handleMutation: () => void
  mutationName: string
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
  handleMutation,
  mutationName,
}) => {
  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle>Are you sure you want to mark these items as {mutationName}?</DialogTitle>

      <DialogContent dividers>
        <Box display="flex" flexDirection="row" justifyContent="space-evenly">
          <Button onClick={() => handleMutation()} variant="contained">
            Yes
          </Button>
          <Button onClick={() => onClose()} variant="contained">
            No
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
