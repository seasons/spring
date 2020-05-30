import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { RefundInvoiceModalProps } from "views/Members/interfaces"
import { CreditNoteReasonCode } from "../Member.types"

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select as muiSelect,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core"
import { DialogTitle } from "components"

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
    comment: "",
    customerNotes: "",
  })

  useEffect(() => {
    setValues({
      ...invoice,
      reasonCode: CreditNoteReasonCode[0],
      comment: "",
      customerNotes: "",
    })
  }, [invoice, open])

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
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
        {title}
      </DialogTitle>
      <DialogContent dividers>
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

          <Grid item md={6} xs={12}></Grid>

          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Customer Notes"
              name="customerNotes"
              multiline
              rows={4}
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
              rows={4}
              onChange={handleFieldChange}
              value={values.comment}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box mr={3} my={1}>
          <Button autoFocus onClick={() => onSave(values)} color="primary" variant="contained">
            Issue Refund
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}
