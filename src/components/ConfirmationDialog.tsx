import React, { useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core"

import { Loader } from "./Loader"
import { colors } from "theme/colors"

export interface ConfirmationDialogProps {
  title: string
  body: string
  open: boolean
  setOpen: (boolean) => void
  onClose: (agreed: boolean) => Promise<void>
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ title, body, open, setOpen, onClose }) => {
  const [isMutating, setIsMutating] = useState(false)
  const handleClose = async (agreed: boolean) => {
    setIsMutating(true)
    await onClose(agreed)
    setOpen(false)
    setIsMutating(false)
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
          {isMutating ? <Loader color={colors.black100} size={20} /> : "Okay"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
