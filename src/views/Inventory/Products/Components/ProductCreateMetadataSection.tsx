import React from "react"
import { TextInput, SelectInput, SelectArrayInput } from "react-admin"
import { Form, Field } from "react-final-form"

import { Grid, styled as muiStyled } from "@material-ui/core"
import styled from "styled-components"

import { FormSelect, FormTextField, Separator, Spacer, Text } from "components"

export interface ProductCreateMetadataSectionProps {
  brands: any[]
  sizes: string[]
  statuses: any[]
}

export const ProductCreateMetadataSection: React.FC<ProductCreateMetadataSectionProps> = ({
  brands,
  sizes,
  statuses,
  ...rest
}) => {
  const brandChoices = brands.map(brand => ({
    display: brand.name,
    value: brand.id,
  }))
  const sizeChoices = sizes.map(size => ({
    display: size,
    value: size,
  }))
  return (
    <Grid item xs={8} {...rest}>
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
      <Grid container>
        <Grid item xs={12}>
          <Text variant="h6">Description</Text>
          <Spacer mt={1} />
          <FormTextField multiline name="description" placeholder="Max 140 characters" />
          <Spacer mt={3} />
        </Grid>
        <Grid item xs={12}>
          <Text variant="h6">Available sizes</Text>
          <Spacer mt={1} />
          <FormSelect multiple name="sizes" choices={sizeChoices} />
          <Spacer mt={3} />
        </Grid>
        <Grid item xs={12}>
          <Text variant="h6">Available status</Text>
          <Spacer mt={1} />
          <FormSelect name="status" choices={statuses} />
        </Grid>
      </Grid>
    </Grid>
  )
}
