import React from "react"

import { Grid } from "@material-ui/core"

import { FormSelect, FormTextField, Separator, Spacer, Text } from "components"

export interface ProductCreateMetadataSectionProps {
  architectures: string[]
  categories: any[]
  colors: any[]
  models: any[]
  sizes: any[]
  types: string[]
  setProductType: (string) => void
}

export const ProductCreateMetadataSection: React.FC<ProductCreateMetadataSectionProps> = ({
  architectures,
  categories,
  colors,
  models,
  sizes,
  types,
  setProductType,
  ...rest
}) => {
  const modelChoices = models.map(model => ({
    display: model.name,
    value: model.id
  }))
  const typeChoices = types.map(type => ({
    display: type,
    value: type,
  }))
  const architectureChoices = architectures.map(architecture => ({
    display: architecture,
    value: architecture,
  }))
  const categoryChoices = categories.map(category => ({
    display: category.name,
    value: category.id,
  }))
  const colorChoices = colors.map(color => ({
    display: <Text style={{ backgroundColor: color.hexCode }}>{color.name}</ Text>,
    value: color.id,
  }))
  return (
    <>
      <Text variant="h4">Metadata</Text>
      <Spacer mt={2} />
      <Separator />
      <Spacer mt={3} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Text variant="h6">Model</Text>
          <Spacer mt={1} />
          <FormSelect name="model" choices={modelChoices} />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h6">Model size</Text>
          <Spacer mt={1} />
          <FormSelect name="modelSize" choices={sizes} />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h6">Type</Text>
          <Spacer mt={1} />
          <FormSelect name="productType" choices={typeChoices} onChange={(event) => setProductType(event.target.value)} />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h6">Season</Text>
          <Spacer mt={1} />
          <FormTextField name="season" />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h6">Retail price</Text>
          <Spacer mt={1} />
          <FormTextField name="retailPrice" />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h6">Architecture</Text>
          <Spacer mt={1} />
          <FormSelect name="productArchitecture" choices={architectureChoices} />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h6">Display category</Text>
          <Spacer mt={1} />
          <FormSelect name="category" choices={categoryChoices} />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h6">Sub-category</Text>
          <Spacer mt={1} />
          <FormSelect name="subCategory" choices={categoryChoices} />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h6">Color</Text>
          <Spacer mt={1} />
          <FormSelect name="color" choices={colorChoices} />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h6">Secondary color</Text>
          <Spacer mt={1} />
          <FormSelect name="secondaryColor" choices={colorChoices} />
        </Grid>
      </Grid>
    </>
  )
}
