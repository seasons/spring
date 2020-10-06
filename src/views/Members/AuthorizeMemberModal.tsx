import React from "react"
import { Box, Button, Grid, Dialog, DialogContent, DialogActions, Typography } from "@material-ui/core"
import { DialogTitle } from "components"
import { useMutation } from "react-apollo"
import { CustomerStatus } from "generated/globalTypes"
import { updateCustomerVariables } from "generated/updateCustomer"
import { MEMBER_DETAIL_UPDATE } from "./queries"

export const AuthorizeMemberModal = ({ member, open, onCompleted, onError, onClose }) => {
  const [updateDetails] = useMutation<any, updateCustomerVariables>(MEMBER_DETAIL_UPDATE, {
    onCompleted,
    onError,
  })

  const authorizeMember = member => {
    updateDetails({
      variables: {
        id: member.id,
        data: { status: CustomerStatus.Authorized },
      },
    })
  }

  if (!open) {
    return null
  }

  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
        Confirm Authorization
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography component="p">
              This will send the member an email, push notify them, send them a text message, and update their status.
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box mr={1} my={1}>
          <Button autoFocus onClick={() => authorizeMember(member)} color="primary" variant="contained">
            Confirm
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}
