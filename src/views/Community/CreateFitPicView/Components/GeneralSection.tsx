import React from "react"

import { Grid } from "@material-ui/core"
import { Spacer, Text } from "components"
import { SelectField, TextField } from "fields"

export const publishedChoices = [
  { value: "true", display: "Published" },
  { value: "false", display: "Not Published" },
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
          <SelectField name="approved" choices={publishedChoices} initialValue={"true"} requiredString />
        </Grid>
      </Grid>
    </>
  )
}
