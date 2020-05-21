import React from "react"

import { Box, Grid } from "@material-ui/core"

import { Spacer, Text } from "components"
import colorsJSON from "data/colors.json"
import {
  ProductUpsertQuery_categories,
  ProductUpsertQuery_colors,
  ProductUpsertQuery_productModels,
} from "generated/ProductUpsertQuery"
import { ExpandableSection } from "./ExpandableSection"
import { SelectField, TextField } from "fields"
import { getFormSelectChoices, FormSelectChoice } from "utils/form"

export interface MetadataSectionProps {
  architectures: string[]
  categories: ProductUpsertQuery_categories[]
  isEditing: boolean
  models: ProductUpsertQuery_productModels[]
  sizes: FormSelectChoice[]
  types: string[]
  setProductType: (string) => void
}

export const MetadataSection: React.FC<MetadataSectionProps> = ({
  architectures,
  categories,
  isEditing,
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
  const colorChoices = colorsJSON.colors.map(color => ({
    display: (
      <Box display="flex" alignItems="center">
        <Text>{color.name}</Text>
        <Spacer ml={1} />
        <Box bgcolor={color.hexCode} width={16} height={16} borderRadius={4} />
      </Box>
    ),
    value: color.colorCode,
  }))
  return (
    <ExpandableSection
      title="Metadata"
      content={
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Text variant="h6">Model</Text>
            <Spacer mt={1} />
            <SelectField name="model" choices={modelChoices} />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Model size</Text>
            <Spacer mt={1} />
            <SelectField name="modelSize" choices={sizes} requiredString />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Type</Text>
            <Spacer mt={1} />
            <SelectField
              disabled={isEditing}
              name="productType"
              choices={typeChoices}
              onChange={event => setProductType(event.target.value)}
              requiredString
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
            <TextField name="retailPrice" minValue={0} />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Architecture</Text>
            <Spacer mt={1} />
            <SelectField name="architecture" choices={architectureChoices} />
          </Grid>
          <Grid item xs={12}>
            <Text variant="h6">Category</Text>
            <Spacer mt={1} />
            <SelectField name="category" choices={categoryChoices} requiredString />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Color</Text>
            <Spacer mt={1} />
            <SelectField name="color" choices={colorChoices} requiredString />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Secondary color</Text>
            <Spacer mt={1} />
            <SelectField name="secondaryColor" choices={colorChoices} />
          </Grid>
        </Grid>
      }
    />
  )
}
