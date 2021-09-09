import React, { useEffect } from "react"

import { Box, Grid, InputAdornment, styled } from "@material-ui/core"

import { Spacer, Text } from "components"
import colorsJSON from "data/colors.json"
import { ProductUpsertQuery_productModels } from "generated/ProductUpsertQuery"
import { ExpandableSection } from "components/ExpandableSection"
import { SelectField, TextField, CheckboxField } from "fields"
import { getFormSelectChoices, FormSelectChoice } from "utils/form"
import { useFormState } from "react-final-form"
import { productCreateBrand_Query } from "views/Inventory/Products/queries"
import { useLazyQuery } from "react-apollo"
import { CustomerStyle } from "generated/globalTypes"

export interface MetadataSectionProps {
  architectures: string[]
  models: ProductUpsertQuery_productModels[]
  manufacturerSizes: FormSelectChoice[]
  buyNewEnabled: boolean
  buyUsedEnabled: boolean
  buyUsedPrice: number | null | undefined
  productTiers: FormSelectChoice[]
  isEditing: boolean
  categoryRecoupment: number | null | undefined
}

export const MetadataSection: React.FC<MetadataSectionProps> = ({
  architectures,
  models,
  manufacturerSizes,
  buyNewEnabled,
  buyUsedEnabled,
  buyUsedPrice,
  productTiers,
  isEditing,
  categoryRecoupment,
}) => {
  const { values: formValues } = useFormState()
  const formBrand = formValues?.brand?.value
  const [getBrandStyles, { data: brandData }] = useLazyQuery(productCreateBrand_Query, {
    variables: {
      brandID: formBrand,
    },
  })
  useEffect(() => {
    if (formBrand) {
      getBrandStyles()
    }
  }, [formBrand, getBrandStyles])

  const modelChoices = [
    { display: "-", value: "" },
    ...models.map(model => ({
      display: model.name,
      value: model.id,
    })),
  ]
  const architectureChoices = getFormSelectChoices(architectures)

  const ColorChoiceDisplay = ({ name, hexCode }) => (
    <Box display="flex" alignItems="center">
      <Text>{name}</Text>
      <Spacer ml={1} />
      <Box bgcolor={hexCode} width={16} height={16} borderRadius={4} />
    </Box>
  )

  const primaryColors = colorsJSON.colors.filter(a => a.type === "primary")
  const secondaryColors = colorsJSON.colors.filter(b => b.type === "secondary")
  const createColorChoice = a => ({
    display: <ColorChoiceDisplay name={a.name} hexCode={a.hexCode} />,
    value: a.colorCode,
  })
  const primaryColorChoices = primaryColors.map(createColorChoice)
  const secondaryColorChoices = [...primaryColorChoices, ...secondaryColors.map(createColorChoice)]

  const productFitChoices = [
    { display: "Runs small", value: "RunsSmall" },
    { display: "True to size", value: "TrueToSize" },
    { display: "Runs big", value: "RunsBig" },
  ]

  const styles = Object.keys(CustomerStyle).map(choice => ({
    display: choice,
    value: choice,
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
            <SelectField name="modelSize" choices={[{ display: "-", value: "" }, ...manufacturerSizes]} />
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
            <Text variant="h6">Wholesale price *</Text>
            <Spacer mt={1} />
            <TextField
              requiredString
              name="wholesalePrice"
              type="number"
              minValue={0}
              InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Recoupment *</Text>
            <Spacer mt={1} />
            <TextField
              requiredString
              name="recoupment"
              type="number"
              minValue={0}
              placeholder={`${categoryRecoupment} (recoupment of the category)`}
            />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Rental price (override)</Text>
            <Spacer mt={1} />
            <TextField
              name="rentalPriceOverride"
              type="number"
              InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Architecture</Text>
            <Spacer mt={1} />
            <SelectField name="architecture" choices={[{ display: "-", value: "" }, ...architectureChoices]} />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Color *</Text>
            <Spacer mt={1} />
            <SelectField name="color" choices={primaryColorChoices} requiredString disabled={isEditing} />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Secondary color</Text>
            <Spacer mt={1} />
            <SelectField name="secondaryColor" choices={[{ display: "-", value: "" }, ...secondaryColorChoices]} />
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
            <Text variant="h6">Product tier</Text>
            <Spacer mt={1} />
            <SelectField
              disabled
              name="productTier"
              choices={[{ display: "-", value: "" }, ...productTiers]}
              defaultValue="Standard"
            />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Buy new enabled</Text>
            <Spacer mt={1} />
            <CheckboxField name="buyNewEnabled" initialValue={buyNewEnabled} />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Buy used enabled</Text>
            <Spacer mt={1} />
            <CheckboxField name="buyUsedEnabled" initialValue={buyUsedEnabled} />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Buy used price</Text>
            <Spacer mt={1} />
            <TextField
              name="buyUsedPrice"
              type="number"
              minValue={0}
              initialValue={0}
              InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            />
          </Grid>
          <Grid item xs={6}>
            <Text variant="h6">Styles</Text>
            <Spacer mt={1} />
            <SelectField
              name="styles"
              multiple
              choices={[{ display: "-", value: "" }, ...styles]}
              initialValue={brandData?.brand?.styles}
            />
          </Grid>
        </Grid>
      }
    />
  )
}
