import React from "react"
import { Box, Button, Grid, Dialog, DialogContent, DialogActions, Typography } from "@material-ui/core"
import { DialogTitle } from "components"

export const MemberInviteModal = ({ open, onSave, onClose, title, body }) => {
  if (!open) {
    return null
  }

  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
        {title}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography component="p">{body}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box mr={1} my={1}>
          <Button autoFocus onClick={onSave} color="primary" variant="contained">
            Confirm
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}
