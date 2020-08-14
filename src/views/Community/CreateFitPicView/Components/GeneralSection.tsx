import React from "react"

import { Grid } from "@material-ui/core"
import { Spacer, Text } from "components"
import { SelectField, TextField } from "fields"
import { FitPicStatus } from "generated/globalTypes"

const publishedChoices = [
  { value: FitPicStatus.Submitted, display: "Submitted" },
  { value: FitPicStatus.Published, display: "Published" },
  { value: FitPicStatus.Unpublished, display: "Unpublished", disabled: true },
]

export const GeneralSection: React.FC = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Text variant="h6">City</Text>
          <Spacer mt={1} />
          <TextField name="city" placeholder="Ex. Brooklyn" requiredString />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h6">State</Text>
          <Spacer mt={1} />
          <TextField name="state" placeholder="Ex. NY" requiredString />
        </Grid>
      </Grid>
      <Spacer mt={3} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Text variant="h6">ZipCode</Text>
          <Spacer mt={1} />
          <TextField name="zipCode" placeholder="Ex. 10013" requiredString />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h6">Status</Text>
          <Spacer mt={1} />
          <SelectField name="status" choices={publishedChoices} initialValue={FitPicStatus.Published} requiredString />
        </Grid>
      </Grid>
    </>
  )
}
