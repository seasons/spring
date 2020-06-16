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

export const AssignRolesModal = ({ open, onSave, onClose, title }) => {
  const [values, setValues] = useState({
    Admin: false,
    Customer: false,
    Blah: false,
  })

  if (!open) {
    return null
  }
  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.checked })
  }

  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
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
                    <Checkbox key={key} checked={values[key]} onChange={handleFieldChange} name={key} color="primary" />
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
