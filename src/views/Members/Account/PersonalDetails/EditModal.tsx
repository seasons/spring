import { capitalize } from "lodash"
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

const PHONE_PATTERN = "[0-9]{3}-[0-9]{3}-[0-9]{4}"

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

export const EditModal: React.FunctionComponent<EditModalIfc> = ({ open, onSave, onClose, editEntity }) => {
  const [values, setValues] = useState({
    ...editEntity,
  })

  const handleFieldChange = event => {
    event.persist()
    setValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
    }))
  }

  const typeMap = {
    email: "email",
    birthday: "date",
    phone: "tel",
  }

  if (!open) {
    return null
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Card>
        <form>
          <CardHeader title="Edit Account Info" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              {Object.keys(editEntity).map(key => (
                <Grid item md={6} xs={12} key={key}>
                  <TextField
                    fullWidth
                    label={capitalize(key)}
                    name={key}
                    type={typeMap[key] || "text"}
                    onChange={handleFieldChange}
                    value={values[key]}
                    variant="outlined"
                    inputProps={key === "phone" ? { pattern: PHONE_PATTERN } : {}}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button onClick={onClose}>Close</Button>
            <Button color="primary" onClick={() => onSave(values)} variant="contained">
              Save
            </Button>
          </CardActions>
        </form>
      </Card>
    </Modal>
  )
}
