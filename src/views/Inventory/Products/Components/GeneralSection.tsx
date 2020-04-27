import React from "react"

import { Grid } from "@material-ui/core"

import { Spacer, Text } from "components"
import { ExpandableSection } from "./ExpandableSection"
import { SelectField, TextField } from "fields"

export interface GeneralSectionProps {
  brands: any[]
  sizes: any[]
  statuses: any[]
}

// const required = value => (value ? undefined : 'Required')

export const GeneralSection: React.FC<GeneralSectionProps> = ({ brands, sizes, statuses }) => {
  const brandChoices = brands.map(brand => ({
    display: brand.name,
    value: brand.id,
  }))
  return (
    <ExpandableSection
      title="General"
      content={
        <>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Text variant="h6">Brand</Text>
              <Spacer mt={1} />
              <SelectField name="brand" choices={brandChoices} />
            </Grid>
            <Grid item xs={6}>
              <Text variant="h6">Product name</Text>
              <Spacer mt={1} />
              <TextField name="name" placeholder="Max 50 characters" maxLength={50} />
            </Grid>
          </Grid>
          <Spacer mt={3} />
          <Grid item xs={12}>
            <Text variant="h6">Description</Text>
            <Spacer mt={1} />
            <TextField multiline name="description" placeholder="Max 140 characters" maxLength={140} />
            <Spacer mt={3} />
          </Grid>
          <Grid item xs={12}>
            <Text variant="h6">Available sizes</Text>
            <Spacer mt={1} />
            <SelectField multiple name="sizes" choices={sizes} requiredStringArray />
            <Spacer mt={3} />
          </Grid>
          <Grid item xs={12}>
            <Text variant="h6">Available status</Text>
            <Spacer mt={1} />
            <SelectField name="status" choices={statuses} requiredString />
          </Grid>
        </>
      }
    />
  )
}
