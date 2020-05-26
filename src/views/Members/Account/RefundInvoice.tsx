import { capitalize } from "lodash"
import React, { useState } from "react"
import styled from "styled-components"
import { RefundInvoiceModalProps } from "views/Members/interfaces"
import { CreditNoteReasonCode } from "../Member.types"

import {
  Button,
  Card as muiCard,
  CardActions as muiCardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select as muiSelect,
  TextField,
  Typography,
} from "@material-ui/core"

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

export const Select = styled(muiSelect)`
  margin-top: 5px;
`

export const RefundInvoiceModal: React.FunctionComponent<RefundInvoiceModalProps> = ({
  title,
  open,
  onSave,
  onClose,
  invoice,
}) => {
  const [values, setValues] = useState({
    ...invoice,
    reasonCode: CreditNoteReasonCode[0],
    comment: "Refunded via admin by @Regy",
    customerNotes: "Customer was very angry",
  })

  const handleFieldChange = event => {
    const key = event.target.name
    const valueEntered = event.target.type === "checkbox" ? event.target.checked : event.target.value
    values[key] = valueEntered

    setValues(currentValues => ({
      ...currentValues,
      key: currentValues[key],
    }))
  }

  if (!open) {
    return null
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Card>
        <form>
          <CardHeader title={title} />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="ID"
                  name="ID"
                  type="text"
                  onChange={handleFieldChange}
                  value={values.id}
                  disabled={true}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Amount"
                  name="Amount"
                  type="text"
                  onChange={handleFieldChange}
                  value={values.amountNormalized}
                  disabled={true}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="reasonCode">Reason Code</InputLabel>
                  <Select id="reasonCode" name="reasonCode" value={values.reasonCode} onChange={handleFieldChange}>
                    {CreditNoteReasonCode.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Customer Notes"
                  name="customerNotes"
                  multiline
                  rowsMax={4}
                  onChange={handleFieldChange}
                  value={values.customerNotes}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Comment"
                  name="comment"
                  multiline
                  rowsMax={4}
                  onChange={handleFieldChange}
                  value={values.comment}
                  variant="outlined"
                />
              </Grid>
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
