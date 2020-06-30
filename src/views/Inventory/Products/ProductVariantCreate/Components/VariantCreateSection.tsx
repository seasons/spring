import React from "react"

import { Grid } from "@material-ui/core"

import { Spacer, Text } from "components"
import { ExpandableSection } from "../../Components"
import { GroupedAutocompleteField, TextField } from "fields"

export const getTypeSpecificVariantFields = productType => {
  let fields: string[] = []
  switch (productType) {
    case "Top":
      fields = ["Shoulder", "Chest", "Length", "Sleeve", "Neck"]
      break
    case "Bottom":
      fields = ["Waist", "Rise", "Hem", "Inseam"]
      break
  }
  return fields
}

export interface VariantCreateSectionProps {
  productType: string
  sizeOptions: { key: string; value: any }[]
  variantIndex: number
}

export const VariantCreateSection: React.FC<VariantCreateSectionProps> = ({
  productType,
  sizeOptions,
  variantIndex,
}) => {
  const typeSpecificFields = getTypeSpecificVariantFields(productType)
  const typeSpecificFirstRowFields = typeSpecificFields.length > 0 ? typeSpecificFields.slice(0, 3) : []
  const typeSpecificSecondRowFields = typeSpecificFields.length > 0 ? typeSpecificFields.slice(3) : []
  const firstRowFields = ["Weight", ...typeSpecificFirstRowFields]
  const secondRowFields = ["Total count", ...typeSpecificSecondRowFields]
  const requiredFields = ["Total count"]
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
                    disabled={field === "SKU"}
                    type={field === "SKU" ? "text" : "number"}
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
              <Text variant="h5">Manufacturer Size *</Text>
              <Spacer mt={1} />
              <GroupedAutocompleteField
                name={`${variantIndex}_${"Manufacturer Size".toLowerCase().replace(" ", "")}`}
                groupedOptions={sizeOptions}
                requiredStringArray
              />
            </Grid>
            <Grid item xs={3}>
              <Text variant="h5">Letter Size *</Text>
              <Spacer mt={1} />
              <GroupedAutocompleteField
                name={`${variantIndex}_${"Letter Size".toLowerCase().replace(" ", "")}`}
                groupedOptions={sizeOptions}
                requiredStringArray
              />
            </Grid>
            <Spacer grid mt={3} />
          </Grid>
        </>
      }
    />
  )
}