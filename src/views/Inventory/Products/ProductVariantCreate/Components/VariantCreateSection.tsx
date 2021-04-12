import React from "react"
import { Grid } from "@material-ui/core"
import { Spacer, Text } from "components"
import { ExpandableSection } from "../../Components"
import { getTypeSpecificVariantFields } from "../../utils"
import { TextField, SelectField } from "fields"
import { getInternalSizes, getManufacturerSizes } from "utils/sizes"
import { getFormSelectChoices } from "utils/form"

export interface VariantCreateSectionProps {
  product: any
  variantIndex: number
}

export const VariantCreateSection: React.FC<VariantCreateSectionProps> = ({ product, variantIndex }) => {
  const productType = product?.type
  const typeSpecificFields = getTypeSpecificVariantFields(productType)
  const typeSpecificFirstRowFields = typeSpecificFields.length > 0 ? typeSpecificFields.slice(0, 3) : []
  const typeSpecificSecondRowFields = typeSpecificFields.length > 0 ? typeSpecificFields.slice(3) : []
  const firstRowFields = ["Weight", ...typeSpecificFirstRowFields]
  const secondRowFields = ["Total count", ...typeSpecificSecondRowFields]
  const requiredFields = productType === "Bottom" ? ["Total count", "Waist", "Inseam"] : ["Total count"]

  const manufacturerSizeType = product?.variants?.[0]?.manufacturerSizes?.[0]?.type
  const manufacturerSizes = getManufacturerSizes(manufacturerSizeType)
  const internalSizes = getInternalSizes(productType)
  console.log("product", product)
  return (
    <ExpandableSection
      title={`#${variantIndex + 1}`}
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
                    type="number"
                    name={`${variantIndex}_${field.toLowerCase()}`}
                    requiredNumber={isRequired}
                  />
                </Grid>
              )
            })}
            <Spacer grid mt={3} />
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
                    type="number"
                    name={`${variantIndex}_${field.toLowerCase().replace(" ", "")}`}
                    requiredNumber={isRequired}
                    maxValue={field === "Total count" ? 99 : undefined}
                  />
                </Grid>
              )
            })}
            <Spacer grid mt={3} />
            <Grid item xs={3}>
              <Text variant="h5">Manufacturer size *</Text>
              <Spacer mt={1} />
              <SelectField
                name={`${variantIndex}_manufacturerSize"`}
                choices={getFormSelectChoices(manufacturerSizes)}
                requiredString
              />
            </Grid>
            {productType === "Top" && (
              <Grid item xs={3}>
                <Text variant="h5">Internal size *</Text>
                <Spacer mt={1} />
                <SelectField
                  name={`${variantIndex}_internalSize`}
                  choices={getFormSelectChoices(internalSizes)}
                  requiredString
                />
              </Grid>
            )}
            <Spacer grid mt={3} />
          </Grid>
        </>
      }
    />
  )
}
