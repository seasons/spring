import React, { useState } from "react"
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Grid,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core"
import { DialogTitle } from "components"
import { CustomerStatus, UserRole } from "generated/globalTypes"

export const AssignRolesModal = ({ open, onSave, onClose, title, member }) => {
  let initialState = {}
  for (const role in UserRole) {
    initialState[role] = member.user.roles.includes(role)
  }

  console.log("member is ", member)
  const [values, setValues] = useState(initialState)
  const userIsAuthorized = member.status === CustomerStatus.Authorized

  if (!open) {
    return null
  }
  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.checked })
  }

  return (
    <Dialog onClose={onClose} aria-labelledby="assign-roles" open={open}>
      <DialogTitle id="assign-roles" onClose={() => onClose?.()}>
        {title}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <FormGroup row>
            {Object.keys(values).map(key => {
              return (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      key={key}
                      disabled={key === UserRole.Admin && !userIsAuthorized}
                      checked={values[key]}
                      onChange={handleFieldChange}
                      name={key}
                      color="primary"
                    />
                  }
                  label={key}
                />
              )
            })}
          </FormGroup>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box mr={1} my={1}>
          <Button autoFocus onClick={onSave} color="primary" variant="contained">
            Assign
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}
