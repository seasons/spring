import React from "react"

import { Grid } from "@material-ui/core"
import { Spacer, Text } from "components"
import { ExpandableSection } from "components/ExpandableSection"
import { AutocompleteField, SelectField, TextField } from "fields"
import { FormSelectChoice, getFormSelectChoices } from "utils/form"
import { ProductUpsertQuery_brands, ProductUpsertQuery_categories } from "generated/ProductUpsertQuery"
import { ACCESSORY_SIZE_TYPES, MANUFACTURER_BOTTOM_SIZE_TYPES, MANUFACTURER_TOP_SIZE_TYPES } from "utils/sizes"
import { ProductEditQuery_product } from "generated/ProductEditQuery"

export interface GeneralSectionProps {
  brands: ProductUpsertQuery_brands[]
  isEditing: boolean
  internalSizes: FormSelectChoice[]
  availabilityStatuses: FormSelectChoice[]
  photographyStatuses: FormSelectChoice[]
  categories: ProductUpsertQuery_categories[]
  types: string[]
  productType: string
  setProductType: (string) => void
  product: ProductEditQuery_product | undefined
}

export const GeneralSection: React.FC<GeneralSectionProps> = ({
  brands,
  isEditing,
  internalSizes,
  availabilityStatuses,
  photographyStatuses,
  types,
  productType,
  setProductType,
  product,
  categories,
}) => {
  const currentStatus = product?.status
  const brandChoices = brands.map(brand => ({
    display: brand.name,
    value: brand.id,
  }))
  const categoriesChoices = categories?.map(c => ({ value: c.id, display: c.name }))
  const typeChoices = getFormSelectChoices(types)

  const manufacturerSizeType = product?.variants?.[0]?.manufacturerSizes?.[0]?.type

  let manufacturerSizeTypeChoices: any[] = []
  switch (productType) {
    case "Top":
      manufacturerSizeTypeChoices = getFormSelectChoices(MANUFACTURER_TOP_SIZE_TYPES)
      // EU, JP, Letter
      break
    case "Bottom":
      // EU, JP, US, WxL
      manufacturerSizeTypeChoices = getFormSelectChoices(MANUFACTURER_BOTTOM_SIZE_TYPES)
      break
    case "Accessory":
      // Universal
      manufacturerSizeTypeChoices = getFormSelectChoices(ACCESSORY_SIZE_TYPES)
      break
  }

  return (
    <ExpandableSection
      title="General"
      content={
        <>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Text variant="h6">Brand *</Text>
              <Spacer mt={1} />
              <AutocompleteField
                name="brand"
                options={brandChoices.map(a => ({ label: a.display, value: a.value }))}
                requiredString
                multiple={false}
                disabled={isEditing}
                getOptionSelected={(option, value) => option.value === value.value}
              />
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

          <Grid container spacing={2}>
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
              <Text variant="h6">Manufacturer size type *</Text>
              <Spacer mt={1} />
              <SelectField
                disabled={isEditing && !!manufacturerSizeType}
                name="manufacturerSizeType"
                choices={manufacturerSizeTypeChoices}
                requiredString
              />
              <Spacer mt={3} />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Text variant="h6">Category *</Text>
              <Spacer mt={1} />
              <SelectField name="category" choices={categoriesChoices} requiredString />
              <Spacer mt={3} />
            </Grid>
            <Grid item xs={6}>
              <Text variant="h6">Internal sizes</Text>
              <Spacer mt={1} />
              <SelectField disabled={isEditing} multiple name="sizes" choices={internalSizes} required />
              <Spacer mt={3} />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Text variant="h6">Available status</Text>
              <Spacer mt={1} />
              <SelectField
                name="status"
                disabled={["Stored", "Offloaded"].includes(currentStatus || "")}
                choices={availabilityStatuses}
                requiredString
              />
              <Spacer mt={3} />
            </Grid>
            <Grid item xs={6}>
              <Text variant="h6">Photography status *</Text>
              <Spacer mt={1} />
              <SelectField name="photographyStatus" choices={photographyStatuses} requiredString />
            </Grid>
          </Grid>
        </>
      }
    />
  )
}
