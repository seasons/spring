import React from "react"

import { Grid } from "@material-ui/core"

import { FormSelect, FormTextField, Separator, Spacer, Text } from "components"

export interface ProductCreateVariantSizeSectionProps {
  variant: any
}

export const ProductCreateVariantSizeSection: React.FC<ProductCreateVariantSizeSectionProps> = ({ variant }) => {
  const { size, sku, type } = variant
  const firstRowFields = ["SKU", "Weight", "Shoulder", "Chest"]
  const secondRowFields = ["Total count", "Length", "Sleeve", "Neck"]
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Text variant="h4">{size}</Text>
          <Spacer mt={2} />
          <Separator height={0.99} />
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
              name={field.toLowerCase()}
              value={field === "SKU" ? sku : undefined}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Spacer mt={3} />
        </Grid>
        {secondRowFields.map((field, index) => (
          <Grid item key={index} xs={3}>
            <Text variant="h5">{field}</Text>
            <Spacer mt={1} />
            <FormTextField name={field.toLowerCase().replace(" ", "")} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Spacer mt={3} />
        </Grid>
      </Grid>
    </>
  )
}
