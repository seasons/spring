import React from "react"

import { Box, Grid, InputAdornment } from "@material-ui/core"

import { Spacer, Text } from "components"
import colorsJSON from "data/colors.json"
import { ProductUpsertQuery_productModels } from "generated/ProductUpsertQuery"
import { ExpandableSection } from "./ExpandableSection"
import { SelectField, TextField } from "fields"
import { getFormSelectChoices, FormSelectChoice } from "utils/form"

export interface MetadataSectionProps {
  architectures: string[]
  models: ProductUpsertQuery_productModels[]
  sizes: FormSelectChoice[]
}

export const MetadataSection: React.FC<MetadataSectionProps> = ({ architectures, models, sizes }) => {
  const modelChoices = models.map(model => ({
    display: model.name,
    value: model.id,
  }))
  const architectureChoices = getFormSelectChoices(architectures)

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
            <SelectField name="modelSize" choices={sizes} />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Retail price</Text>
            <Spacer mt={1} />
            <TextField
              name="retailPrice"
              type="number"
              minValue={0}
              InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Architecture</Text>
            <Spacer mt={1} />
            <SelectField name="architecture" choices={architectureChoices} />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Color *</Text>
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
