import React from "react"

import { Grid } from "@material-ui/core"

import { Spacer, Text } from "components"
import { ExpandableSection } from "./ExpandableSection"
import { TextField } from "fields"

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

export interface VariantSizeSectionProps {
  productType: string
  size: string
  sku: string
}

export const VariantSizeSection: React.FC<VariantSizeSectionProps> = ({ productType, size, sku }) => {
  const typeSpecificFields = getTypeSpecificVariantFields(productType)
  const typeSpecificFirstRowFields = typeSpecificFields.length > 0 ? typeSpecificFields.slice(0, 2) : []
  const typeSpecificSecondRowFields = typeSpecificFields.length > 0 ? typeSpecificFields.slice(2) : []
  const firstRowFields = ["SKU", "Weight", ...typeSpecificFirstRowFields]
  const secondRowFields = ["Total count", ...typeSpecificSecondRowFields]
  return (
    <ExpandableSection
      title={size}
      content={
        <>
          <Grid container spacing={2}>
            {firstRowFields.map((field, index) => (
              <Grid item key={index} xs={3}>
                <Text variant="h5">{field}</Text>
                <Spacer mt={1} />
                <TextField
                  disabled={field === "SKU"}
                  name={`${size}_${field.toLowerCase()}`}
                  initialValue={field === "SKU" ? sku : undefined}
                  requiredNumber={field !== "SKU"}
                />
              </Grid>
            ))}
            <Spacer grid mt={3} />
            {secondRowFields.map((field, index) => (
              <Grid item key={index} xs={3}>
                <Text variant="h5">{field}</Text>
                <Spacer mt={1} />
                <TextField name={`${size}_${field.toLowerCase().replace(" ", "")}`} requiredNumber />
              </Grid>
            ))}
            <Spacer grid mt={3} />
          </Grid>
        </>
      }
    />
  )
}
