import React from "react"
import { Grid } from "@material-ui/core"
import { Spacer, Text } from "components"
import { ExpandableSection } from "./ExpandableSection"
import { TextField, SelectField } from "fields"
import { getTypeSpecificVariantFields } from "../utils"
import { ManufacturerSizeType, getManufacturerSizes } from "utils/sizes"
import { getFormSelectChoices } from "utils/form"

export interface VariantSizeSectionProps {
  isEditing?: boolean
  productType: string
  size: string
  sku: string
  bottomSizes: any[]
  manufacturerSizeType: ManufacturerSizeType | null
}

export const VariantSizeSection: React.FC<VariantSizeSectionProps> = ({
  manufacturerSizeType,
  isEditing,
  productType,
  size,
  sku,
}) => {
  const typeSpecificFields = getTypeSpecificVariantFields(productType)
  const typeSpecificFirstRowFields = typeSpecificFields.length > 0 ? typeSpecificFields.slice(0, 2) : []
  const typeSpecificSecondRowFields = typeSpecificFields.length > 0 ? typeSpecificFields.slice(2) : []
  const firstRowFields = ["Total count", "SKU", ...typeSpecificFirstRowFields]
  const secondRowFields = ["Weight", ...typeSpecificSecondRowFields]
  const requiredFields = ["Total count"]

  const manufacturerSizes = getManufacturerSizes(manufacturerSizeType).map(x => x.toString())

  return (
    <ExpandableSection
      title={size}
      content={
        <>
          <Grid container spacing={2}>
            {firstRowFields.map((field, index) => {
              const isRequired = requiredFields.includes(field)
              return (
                <Grid item key={index} xs={3}>
                  <Text variant="h5">
                    {field}
                    {isRequired && " *"}
                  </Text>
                  <Spacer mt={1} />
                  <TextField
                    disabled={field === "SKU" || (isEditing && field === "Total count")}
                    type={field === "SKU" ? "text" : "number"}
                    name={`${size}_${field.toLowerCase().replace(" ", "")}`}
                    initialValue={field === "SKU" ? sku : undefined}
                    requiredNumber={isRequired}
                    maxValue={field === "Total count" ? 99 : undefined}
                  />
                </Grid>
              )
            })}
            <Spacer grid mt={2} />
            {secondRowFields.map((field, index) => {
              const isRequired = requiredFields.includes(field)
              return (
                <Grid item key={index} xs={3}>
                  <Text variant="h5">
                    {field}
                    {isRequired && " *"}
                  </Text>
                  <Spacer mt={1} />
                  <TextField
                    disabled={isEditing}
                    type="number"
                    name={`${size}_${field.toLowerCase().replace(" ", "")}`}
                    requiredNumber={isRequired}
                  />
                </Grid>
              )
            })}
            <Spacer grid mt={2} />
            {productType === "Bottom" && (
              <Grid item xs={3}>
                <Text variant="h5">Manufacturer sizes</Text>
                <Spacer mt={1} />
                <SelectField
                  name={`${size}_manufacturerSize_${manufacturerSizeType}`}
                  choices={getFormSelectChoices(manufacturerSizes)}
                />
                <Spacer grid mt={2} />
              </Grid>
            )}
          </Grid>
        </>
      }
    />
  )
}
