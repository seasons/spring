import React from "react"

import { Box, Grid, InputAdornment } from "@material-ui/core"

import { Spacer, Text } from "components"
import colorsJSON from "data/colors.json"
import { ProductUpsertQuery_productModels } from "generated/ProductUpsertQuery"
import { ExpandableSection } from "./ExpandableSection"
import { SelectField, TextField, CheckboxField } from "fields"
import { getFormSelectChoices, FormSelectChoice } from "utils/form"

export interface MetadataSectionProps {
  architectures: string[]
  models: ProductUpsertQuery_productModels[]
  sizes: FormSelectChoice[]
  buyNewEnabled: boolean
  productTiers: FormSelectChoice[]
}

export const MetadataSection: React.FC<MetadataSectionProps> = ({
  architectures,
  models,
  sizes,
  buyNewEnabled,
  productTiers,
}) => {
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

  const productFitChoices = [
    { display: "Runs small", value: "RunsSmall" },
    { display: "True to size", value: "TrueToSize" },
    { display: "Runs big", value: "RunsBig" },
  ]

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
          <Grid item xs={6}>
            <Text variant="h6">External URL</Text>
            <Spacer mt={1} />
            <TextField name="externalURL" type="url" />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Fit</Text>
            <Spacer mt={1} />
            <SelectField name="productFit" choices={productFitChoices} />
          </Grid>
          <Grid item xs={12}>
            <Text variant="h6">Product Tier</Text>
            <Spacer mt={1} />
            <SelectField disabled name="productTier" choices={productTiers} defaultValue="Luxury" />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Buy New Enabled</Text>
            <Spacer mt={1} />
            <CheckboxField name="buyNewEnabled" initialValue={buyNewEnabled} />
          </Grid>
        </Grid>
      }
    />
  )
}
