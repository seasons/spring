import React from "react"

import { Grid } from "@material-ui/core"

import { FormTextField, Separator, Spacer, Text } from "components"

export const getTypeSpecificVariantFields = productType => {
  let fields: string[] = []
  switch (productType) {
    case "Top":
      fields = ["Shoulder", "Chest", "Length", "Sleeve", "Neck"]
      break
    case "Bottom":
      fields = ["Value", "Waist", "Rise", "Hem", "Inseam"]
      break
  }
  return fields
}

export interface ProductCreateVariantSizeSectionProps {
  variant: any
}

export const ProductCreateVariantSizeSection: React.FC<ProductCreateVariantSizeSectionProps> = ({ variant }) => {
  const { size, sku, type } = variant
  const typeSpecificFields = getTypeSpecificVariantFields(type)
  const typeSpecificFirstRowFields = typeSpecificFields.length > 0 ? typeSpecificFields.slice(0, 2) : []
  const typeSpecificSecondRowFields = typeSpecificFields.length > 0 ? typeSpecificFields.slice(2) : []
  const firstRowFields = ["SKU", "Weight", ...typeSpecificFirstRowFields]
  const secondRowFields = ["Total count", ...typeSpecificSecondRowFields]
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Text variant="h4">{size}</Text>
          <Spacer mt={2} />
          <Separator />
          <Spacer mt={3} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {firstRowFields.map((field, index) => (
          <Grid item key={index} xs={3}>
            <Text variant="h5">{field}</Text>
            <Spacer mt={1} />
            <FormTextField
              disabled={field === "SKU"}
              name={`${sku}_${field.toLowerCase()}`}
              value={field === "SKU" ? sku : undefined}
            />
          </Grid>
        ))}
        <Spacer grid mt={3} />
        {secondRowFields.map((field, index) => (
          <Grid item key={index} xs={3}>
            <Text variant="h5">{field}</Text>
            <Spacer mt={1} />
            <FormTextField name={`${sku}_${field.toLowerCase().replace(" ", "")}`} />
          </Grid>
        ))}
        <Spacer grid mt={3} />
      </Grid>
    </>
  )
}
