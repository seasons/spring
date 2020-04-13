import React from "react"
import { TextInput, SelectInput, SelectArrayInput } from "react-admin"
import { Form, Field } from "react-final-form"

import { Grid, styled as muiStyled } from "@material-ui/core"
import styled from "styled-components"

import { FormSelect, FormTextField, Separator, Spacer, Text } from "components"

export interface ProductCreateGeneralSectionProps {
  brands: any[]
  sizes: string[]
  statuses: any[]
}

export const ProductCreateGeneralSection: React.FC<ProductCreateGeneralSectionProps> = ({
  brands,
  sizes,
  statuses,
  ...rest
}) => {
  const brandChoices = brands.map(brand => ({
    value: brand.id,
    display: brand.name,
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
        <Text variant="h6">Description</Text>
        <Spacer mt={1} />
        <FormTextField multiline name="description" placeholder="Max 140 characters" />
        <Spacer mt={3} />
        <Text variant="h6">Available sizes</Text>
        <Spacer mt={1} />
        <StyledSelectArrayInput source="sizes" choices={sizes.map(size => ({ id: size, name: size }))} />
        <Spacer mt={3} />
        <Text variant="h6">Available status</Text>
        <Spacer mt={1} />
        <StyledSelectInput source="status" choices={statuses} />
      </Grid>
    </Grid>
  )
}

const StyledSelectInput = muiStyled(SelectInput)({
  width: "100%",
})

const StyledSelectArrayInput = muiStyled(SelectArrayInput)({
  width: "100%",
})

const StyledTextInput = muiStyled(TextInput)({
  width: "100%",
})
