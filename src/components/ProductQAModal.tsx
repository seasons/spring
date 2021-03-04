import React, { useState } from "react"

import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Snackbar,
  DialogTitle,
  Select,
  MenuItem,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { gql } from "apollo-boost"
import { useSelector } from "react-redux"
import { useMutation } from "react-apollo"

export const SUBMIT_QA_ENTRY = gql`
  mutation SubmitQAEntry(
    $notes: String!
    $type: PhysicalProductDamageType
    $damageTypes: [PhysicalProductDamageType!]
    $physicalProductID: ID!
    $userID: ID!
  ) {
    createPhysicalProductQualityReport(
      data: {
        damageTypes: { set: $damageTypes }
        damageType: $type
        notes: $notes
        physicalProduct: { connect: { id: $physicalProductID } }
        user: { connect: { id: $userID } }
      }
    ) {
      id
    }
  }
`

export const ProductQAModal = ({ data, open, onSave, onClose }) => {
  const [snackbar, toggleSnackbar] = useState<{ show: boolean; message: string; status }>({
    show: false,
    message: "",
    status: "success",
  })
  const session = useSelector(state => state.session)
  const [submitQAEntry] = useMutation(SUBMIT_QA_ENTRY, {
    onCompleted: onSave,
  })

  const [type, setType] = useState<string[]>([])
  const [notes, setNotes] = useState("")

  const handleSave = () => {
    submitQAEntry({
      variables: {
        notes,
        type: type?.[0],
        damageTypes: type,
        physicalProductID: data.id,
        userID: session.user.id,
      },
    })
  }

  const hideSnackbar = () => {
    toggleSnackbar({
      show: false,
      message: "",
      status: "success",
    })
  }

  return (
    <>
      <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title">Product Quality Assurance</DialogTitle>
        <DialogContent dividers>
          <Box my={2} width={["550px"]}>
            <Box mb={4}>
              <Select
                label="Damage Type"
                value={type}
                variant="outlined"
                onChange={event => {
                  setType(event.target.value as string[])
                }}
                multiple
                fullWidth
              >
                <MenuItem value="BarcodeMissing">Barcode Missing</MenuItem>
                <MenuItem value="ButtonMissing">Button Missing</MenuItem>
                <MenuItem value="Stain">Stain</MenuItem>
                <MenuItem value="Smell">Smell</MenuItem>
                <MenuItem value="Tear">Tear</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </Box>
            <TextField
              label="Notes"
              name="notes"
              type="text"
              variant="outlined"
              onChange={event => {
                setNotes(event.target.value as string)
              }}
              value={notes}
              multiline
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.show}
        autoHideDuration={6000}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={hideSnackbar} severity={snackbar.status}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
