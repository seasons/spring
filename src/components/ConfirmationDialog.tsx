import React from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core"

export interface ConfirmationDialogProps {
  title: string
  body: string
  open: boolean
  setOpen: (boolean) => void
  onClose: (agreed: boolean) => void
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ title, body, open, setOpen, onClose }) => {
  const handleClose = (agreed: boolean) => {
    setOpen(false)
    onClose(agreed)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{body}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleClose(true)} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
