import React from "react"

import { Grid } from "@material-ui/core"

import { Spacer, Text } from "components"
import { ProductUpsertQuery_brands } from "generated/ProductUpsertQuery"
import { ExpandableSection } from "./ExpandableSection"
import { SelectField, TextField } from "fields"
import { FormSelectChoice } from "utils/form"

export interface GeneralSectionProps {
  bottomSizeTypeChoices: any[]
  brands: ProductUpsertQuery_brands[]
  isEditing: boolean
  productType: string
  sizes: FormSelectChoice[]
  statuses: FormSelectChoice[]
}

// const required = value => (value ? undefined : 'Required')

export const GeneralSection: React.FC<GeneralSectionProps> = ({
  bottomSizeTypeChoices,
  brands,
  isEditing,
  productType,
  sizes,
  statuses,
}) => {
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
              <Text variant="h6">Brand *</Text>
              <Spacer mt={1} />
              <SelectField name="brand" choices={brandChoices} requiredString />
            </Grid>
            <Grid item xs={6}>
              <Text variant="h6">Product name *</Text>
              <Spacer mt={1} />
              <TextField name="name" placeholder="Max 50 characters" maxLength={50} />
            </Grid>
          </Grid>
          <Spacer mt={3} />
          <Grid item xs={12}>
            <Text variant="h6">Description *</Text>
            <Spacer mt={1} />
            <TextField multiline name="description" placeholder="Enter a description" requiredString />
            <Spacer mt={3} />
          </Grid>
          {productType === "Bottom" && (
            <Grid item xs={12}>
              <Text variant="h6">Size Type</Text>
              <Spacer mt={1} />
              <SelectField multiple name="bottomSizeType" choices={bottomSizeTypeChoices} requiredStringArray />
              <Spacer mt={3} />
            </Grid>
          )}
          <Grid item xs={12}>
            <Text variant="h6">Available sizes</Text>
            <Spacer mt={1} />
            <SelectField disabled={isEditing} multiple name="sizes" choices={sizes} />
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
