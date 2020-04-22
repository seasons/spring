import React from "react"

import { Grid } from "@material-ui/core"

import { Spacer, Text } from "components"
import { SelectField, TextField } from "fields"
import { SectionHeader } from "./SectionHeader"
import { getFormSelectChoices } from "utils/form"

export interface MetadataSectionProps {
  architectures: string[]
  categories: any[]
  colors: any[]
  models: any[]
  sizes: any[]
  types: string[]
  setProductType: (string) => void
}

export const MetadataSection: React.FC<MetadataSectionProps> = ({
  architectures,
  categories,
  colors,
  models,
  sizes,
  types,
  setProductType,
}) => {
  const modelChoices = models.map(model => ({
    display: model.name,
    value: model.id,
  }))
  const typeChoices = getFormSelectChoices(types)
  const architectureChoices = getFormSelectChoices(architectures)
  const categoryChoices = categories.map(category => ({
    display: category.name,
    value: category.id,
  }))
  const colorChoices = colors.map(color => ({
    display: <Text style={{ backgroundColor: color.hexCode }}>{color.name}</Text>,
    value: color.id,
  }))
  return (
    <>
      <SectionHeader title="Metadata" />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Text variant="h6">Model</Text>
          <Spacer mt={1} />
          <SelectField name="model" choices={modelChoices} />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h6">Model size</Text>
          <Spacer mt={1} />
          <SelectField name="modelSize" choices={sizes} />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h6">Type</Text>
          <Spacer mt={1} />
          <SelectField
            name="productType"
            choices={typeChoices}
            onChange={event => setProductType(event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h6">Season</Text>
          <Spacer mt={1} />
          <TextField name="season" />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h6">Retail price</Text>
          <Spacer mt={1} />
          <TextField name="retailPrice" />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h6">Architecture</Text>
          <Spacer mt={1} />
          <SelectField name="architecture" choices={architectureChoices} />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h6">Display category</Text>
          <Spacer mt={1} />
          <SelectField name="category" choices={categoryChoices} />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h6">Sub-category</Text>
          <Spacer mt={1} />
          <SelectField name="subCategory" choices={categoryChoices} />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h6">Color</Text>
          <Spacer mt={1} />
          <SelectField name="color" choices={colorChoices} />
        </Grid>
        <Grid item xs={6}>
          <Text variant="h6">Secondary color</Text>
          <Spacer mt={1} />
          <SelectField name="secondaryColor" choices={colorChoices} />
        </Grid>
      </Grid>
    </>
  )
}
