import React from "react"

import { Grid } from "@material-ui/core"

import { Spacer, Text } from "components"
import { SelectField, TextField } from "fields"
import { SectionHeader } from "./SectionHeader"

export interface PhysicalProductSectionProps {
  sku: string
  statusChoices: any[]
}

export const PhysicalProductSection: React.FC<PhysicalProductSectionProps> = ({ sku, statusChoices }) => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <SectionHeader title={sku} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Text variant="h5">Status</Text>
          <Spacer mt={1} />
          <SelectField name={`${sku}_physicalProductStatus`} choices={statusChoices} />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h5">Date ordered</Text>
          <Spacer mt={1} />
          <TextField name={`${sku}_dateOrdered`} />
        </Grid>
        <Spacer grid mt={3} />
        <Grid item xs={6}>
          <Text variant="h5">Unit cost</Text>
          <Spacer mt={1} />
          <TextField name={`${sku}_unitCost`} />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h5">Date received</Text>
          <Spacer mt={1} />
          <TextField name={`${sku}_dateReceived`} />
        </Grid>
        <Spacer grid mt={5} />
      </Grid>
    </>
  )
}
