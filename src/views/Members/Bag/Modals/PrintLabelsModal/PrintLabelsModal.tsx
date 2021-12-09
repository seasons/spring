import { DialogTitle } from "components"

import { Box, Button, Dialog, DialogContent, DialogActions } from "@material-ui/core"
import React from "react"
import { PrintLabelCard } from "./PrintLabelCard"

interface PrintLabelsModalProps {
  open: boolean
  onClose?: () => void
  data: any
}

export const PrintLabelsModal: React.FC<PrintLabelsModalProps> = ({ data, open, onClose }) => {
  if (!data) {
    return null
  }

  return (
    <>
      <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
          Print Labels
        </DialogTitle>
        <DialogContent dividers>
          <Box mt={2} mb={2}>
            {data.map(pkg => {
              return (
                <Box mb={2}>
                  <PrintLabelCard data={pkg} />
                </Box>
              )
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose} color="primary" variant="contained">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
