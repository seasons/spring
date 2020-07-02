import React from "react"

import { Grid } from "@material-ui/core"

import { Spacer, Text } from "components"
import { ExpandableSection } from "./ExpandableSection"
import { TextField } from "fields"
import { getTypeSpecificVariantFields } from "../utils"

export interface VariantSizeSectionProps {
  isEditing?: boolean
  productType: string
  size: string
  sku: string
}

export const VariantSizeSection: React.FC<VariantSizeSectionProps> = ({ isEditing, productType, size, sku }) => {
  const typeSpecificFields = getTypeSpecificVariantFields(productType)
  const typeSpecificFirstRowFields = typeSpecificFields.length > 0 ? typeSpecificFields.slice(0, 2) : []
  const typeSpecificSecondRowFields = typeSpecificFields.length > 0 ? typeSpecificFields.slice(2) : []
  const firstRowFields = ["SKU", "Weight", ...typeSpecificFirstRowFields]
  const secondRowFields = ["Total count", ...typeSpecificSecondRowFields]
  const requiredFields = ["Total count"]
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
                    disabled={field === "SKU"}
                    type={field === "SKU" ? "text" : "number"}
                    name={`${size}_${field.toLowerCase()}`}
                    initialValue={field === "SKU" ? sku : undefined}
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
                    disabled={isEditing && field === "Total count"}
                    type="number"
                    name={`${size}_${field.toLowerCase().replace(" ", "")}`}
                    requiredNumber={isRequired}
                    maxValue={field === "Total count" ? 99 : undefined}
                  />
                </Grid>
              )
            })}
            <Spacer grid mt={3} />
          </Grid>
        </>
      }
    />
  )
}
