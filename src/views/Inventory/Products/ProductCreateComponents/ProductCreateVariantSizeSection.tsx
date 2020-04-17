import React from "react"

import { Grid } from "@material-ui/core"

import { FormSelect, FormTextField, Separator, Spacer, Text } from "components"

export interface ProductCreateVariantSizeSectionProps {
  variant: any
}

export const ProductCreateVariantSizeSection: React.FC<ProductCreateVariantSizeSectionProps> = ({ variant }) => {
  const { size, sku, type } = variant
  let typeSpecificFirstRowFields: string[] = []
  let typeSpecificSecondRowFields: string[] = []
  console.log(size)
  switch (type) {
    case "Top":
      typeSpecificFirstRowFields = ["Shoulder", "Chest"]
      typeSpecificSecondRowFields = ["Length", "Sleeve", "Neck"]
      break
    case "Bottom":
      typeSpecificFirstRowFields = ["Value", "Waist"]
      typeSpecificSecondRowFields = ["Rise", "Hem", "Inseam"]
      break
  }
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
