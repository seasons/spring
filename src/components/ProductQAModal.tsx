import React, { useState } from "react"

import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  DialogTitle,
  Select,
  MenuItem,
  Slider,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import gql from "graphql-tag"
import { useSelector } from "react-redux"
import { useMutation } from "react-apollo"

const DEFAULT_SCORE = 10
const MAX_SCORE = 10
export const SUBMIT_QA_ENTRY = gql`
  mutation SubmitQAEntry(
    $notes: String!
    $type: PhysicalProductDamageType
    $damageTypes: [PhysicalProductDamageType!]
    $score: Int
    $published: Boolean!
    $physicalProductID: ID!
    $userID: ID!
  ) {
    createPhysicalProductQualityReport(
      data: {
        damageTypes: { set: $damageTypes }
        damageType: $type
        notes: $notes
        score: $score
        published: $published
        physicalProduct: { connect: { id: $physicalProductID } }
        user: { connect: { id: $userID } }
      }
    ) {
      id
    }
  }
`

export const ProductQAModal = ({ data, open, onSave, onClose }) => {
  // @ts-ignore
  const session = useSelector(state => state.session)
  const [submitQAEntry] = useMutation(SUBMIT_QA_ENTRY, {
    onCompleted: onSave,
  })

  const [type, setType] = useState<string[]>([])
  const [notes, setNotes] = useState("")
  const [score, setScore] = useState(DEFAULT_SCORE)
  const [published, setPublished] = useState(false)

  const handleSave = () => {
    submitQAEntry({
      variables: {
        notes,
        type: type?.[0],
        damageTypes: type,
        physicalProductID: data.id,
        userID: session.user.id,
        score: score,
        published: published,
      },
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
            <Box mt={4}>
              <Box mb={5}>
                <Typography>Score</Typography>
              </Box>
              <LightLabelSlider
                value={score}
                onChange={(_ev, value) => setScore(Math.min(value as number, MAX_SCORE))}
                defaultValue={10}
                valueLabelDisplay="on"
                marks={true}
                step={1}
                min={1}
                max={MAX_SCORE}
              />
            </Box>
          </Box>
          <Box mt={2}>
            <FormControlLabel
              control={
                <Checkbox checked={published} onChange={ev => setPublished(ev.target.checked)} name="published" />
              }
              label="Published"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const LightLabelSlider = withStyles(theme => ({
  valueLabel: {
    color: "rgba(0, 0, 0, .5)",
  },
}))(Slider)
