import React from "react"

import { Grid } from "@material-ui/core"

import { Spacer, Text } from "components"
import { ExpandableSection } from "./ExpandableSection"
import { SelectField, TextField } from "fields"

export interface PhysicalProductSectionProps {
  statusChoices: any[]
  uid: string
}

export const PhysicalProductSection: React.FC<PhysicalProductSectionProps> = ({ statusChoices, uid }) => {
  return (
    <ExpandableSection
      title={uid}
      content={
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Text variant="h5">Status</Text>
            <Spacer mt={1} />
            <SelectField name={`${uid}_physicalProductStatus`} choices={statusChoices} requiredString />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h5">Date ordered</Text>
            <Spacer mt={1} />
            <TextField name={`${uid}_dateOrdered`} requiredDate />
          </Grid>
          <Spacer grid mt={3} />
          <Grid item xs={6}>
            <Text variant="h5">Unit cost</Text>
            <Spacer mt={1} />
            <TextField name={`${uid}_unitCost`} requiredNumber />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h5">Date received</Text>
            <Spacer mt={1} />
            <TextField name={`${uid}_dateReceived`} requiredDate />
          </Grid>
          <Spacer grid mt={5} />
        </Grid>
      }
    />
  )
}
