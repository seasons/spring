import React from "react"

import { Grid } from "@material-ui/core"

import { FormSelect, FormTextField, Separator, Spacer, Text } from "components"

export interface ProductCreateGeneralSectionProps {
  brands: any[]
  sizes: any[]
  statuses: any[]
}

export const ProductCreateGeneralSection: React.FC<ProductCreateGeneralSectionProps> = ({
  brands,
  sizes,
  statuses,
  ...rest
}) => {
  const brandChoices = brands.map(brand => ({
    display: brand.name,
    value: brand.id,
  }))
  return (
    <>
      <Text variant="h4">General</Text>
      <Spacer mt={2} />
      <Separator />
      <Spacer mt={3} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Text variant="h6">Brand</Text>
          <Spacer mt={1} />
          <FormSelect name="brand" choices={brandChoices} />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h6">Product name</Text>
          <Spacer mt={1} />
          <FormTextField name="name" placeholder="Max 50 characters" />
        </Grid>
      </Grid>
      <Spacer mt={3} />
      <Grid item xs={12}>
        <Text variant="h6">Description</Text>
        <Spacer mt={1} />
        <FormTextField multiline name="description" placeholder="Max 140 characters" />
        <Spacer mt={3} />
      </Grid>
      <Grid item xs={12}>
        <Text variant="h6">Available sizes</Text>
        <Spacer mt={1} />
        <FormSelect multiple name="sizes" choices={sizes} />
        <Spacer mt={3} />
      </Grid>
      <Grid item xs={12}>
        <Text variant="h6">Available status</Text>
        <Spacer mt={1} />
        <FormSelect name="status" choices={statuses} />
      </Grid>
    </>
  )
}
