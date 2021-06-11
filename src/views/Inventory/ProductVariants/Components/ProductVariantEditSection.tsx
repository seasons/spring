import React from "react"
import { Box, Grid } from "@material-ui/core"
import { ExpandableSection, Spacer, Text } from "components"
import { TextField, SelectField } from "fields"
import { getInternalSizes, ManufacturerSizeType } from "utils/sizes"
import { getFormSelectChoices } from "utils/form"
import { getTypeSpecificVariantFields } from "views/Inventory/Products/utils"
import { ManufacturerSizeField } from "./ManufacturerSizeField"
import { ProductType } from "generated/globalTypes"

export interface ProductVariantEditSectionProps {
  product: any
  variantIndex: number | string
  sku?: string
  size?: string
  productType: ProductType
  manufacturerSizeType?: ManufacturerSizeType
  isEditing?: boolean
}

export const ProductVariantEditSection: React.FC<ProductVariantEditSectionProps> = ({
  product,
  variantIndex,
  sku,
  productType,
  size,
  isEditing,
  manufacturerSizeType,
}) => {
  const typeSpecificFields = getTypeSpecificVariantFields(productType)

  // Edge case where the product was created with zero variants we need to show manufacturer type choice here
  // TODO: read from product manufacturer type
  const manufacturerSizeTypeFromSibling = product?.variants?.[0]?.manufacturerSizes?.[0]?.type
  const internalSizes = getInternalSizes(productType)
  const isUniversal = manufacturerSizeTypeFromSibling === "Universal" || manufacturerSizeType === "Universal"

  const fieldNameToName = fieldName => `${variantIndex}_${fieldName.toLowerCase().replace(" ", "")}`

  const RenderTextField = ({
    fieldName,
    isRequired = false,
    type = "text",
    initialValue,
    disabled,
  }: {
    fieldName: string
    isRequired?: boolean
    type?: "text" | "number"
    initialValue?: string | number
    disabled?: boolean
  }) => {
    return (
      <Box display="flex" alignContent="center" mb={1}>
        <Box flex={1} display="flex" alignItems="center">
          <Text variant="h5">
            {fieldName}
            {isRequired && " *"}
          </Text>
        </Box>
        <Box flex={1}>
          <TextField
            type={type}
            name={fieldNameToName(fieldName)}
            requiredNumber={isRequired}
            initialValue={initialValue}
            disabled={disabled}
          />
        </Box>
      </Box>
    )
  }

  return (
    <ExpandableSection
      title={typeof variantIndex === "string" ? variantIndex : `#${variantIndex + 1}`}
      content={
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Box mb={8}>
              <Text variant="h4">General</Text>
              <Spacer mt={4} />
              <RenderTextField fieldName="SKU" type="text" disabled initialValue={sku} />
              <RenderTextField fieldName="Total count" type="number" initialValue={1} isRequired />
            </Box>

            <Box mb={8}>
              <Text variant="h4">Sizes</Text>
              <Spacer mt={4} />

              <ManufacturerSizeField
                namePrefix={String(variantIndex)}
                sizeType={manufacturerSizeTypeFromSibling || manufacturerSizeType}
              />

              <Box display="flex" mb={1}>
                <Box flex={1}>
                  <Text variant="h5">Internal size *</Text>
                </Box>
                <Box flex={1} display="flex" alignItems="center">
                  <SelectField
                    name={`${variantIndex}_internalSize`}
                    choices={getFormSelectChoices(internalSizes)}
                    initialValue={size}
                    requiredString
                    disabled={isEditing || isUniversal}
                  />
                </Box>
              </Box>
            </Box>

            <Box mb={8}>
              <Text variant="h4">Measurements</Text>
              <Spacer mt={4} />
              {typeSpecificFields.map((field, index) => {
                let name = field
                if (field === "Width") {
                  name = "Lense width (mm)"
                } else if (name === "Bridge" || name === "Length") {
                  name = `${field} (mm)`
                }
                return <RenderTextField fieldName={name} type="number" key={field + index} />
              })}
            </Box>
          </Grid>
        </Grid>
      }
    />
  )
}
