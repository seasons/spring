import moment from "moment"
import React, { useState } from "react"
import styled from "styled-components"

import {
  Button,
  Card as muiCard,
  CardActions as muiCardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Modal,
  TextField,
} from "@material-ui/core"

import { EditModalIfc } from "../../interfaces"

export const Card = styled(muiCard)`
  top: 50%;
  left: 50%;
  width: 700px;
  outline: none;
  position: absolute;
  max-width: 100%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 20px 31px 3px rgba(0, 0, 0, 0.14),
    0px 8px 38px 7px rgba(0, 0, 0, 0.12);
  max-height: 100%;
  overflow-y: auto;
`
export const CardActions = styled(muiCardActions)`
  justify-content: flex-end;
`

export const EditModal: React.FunctionComponent<EditModalIfc> = ({ open, onClose, member, ...rest }) => {
  const [values, setValues] = useState({
    ...member,
  })

  const handleFieldChange = event => {
    event.persist()
    setValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
    }))
  }

  if (!open) {
    return null
  }

  const birthday = moment(member.detail.birthday).format("MM/DD/YYYY")

  return (
    <Modal onClose={onClose} open={open}>
      <Card {...rest}>
        <form>
          <CardHeader title="Edit Account Info" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Status"
                  name="status"
                  onChange={handleFieldChange}
                  value={values.status}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Membership"
                  name="membership"
                  onChange={handleFieldChange}
                  value={values.plan}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Email address"
                  name="email"
                  onChange={handleFieldChange}
                  value={values.user.email}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Phone number"
                  name="phoneNumber"
                  onChange={handleFieldChange}
                  value={values.detail.phoneNumber}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Birthday"
                  name="birthday"
                  onChange={handleFieldChange}
                  value={birthday}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button onClick={onClose}>Close</Button>
            <Button color="primary" onClick={onClose} variant="contained">
              Save
            </Button>
          </CardActions>
        </form>
      </Card>
    </Modal>
  )
}
