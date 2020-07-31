import React from "react"
import { Grid } from "@material-ui/core"
import { Spacer, Text } from "components"
import { ExpandableSection } from "./ExpandableSection"
import { TextField, SelectField } from "fields"
import { getTypeSpecificVariantFields } from "../utils"
import { uniq } from "lodash"
import { getFormSelectChoices } from "utils/form"

export interface VariantSizeSectionProps {
  isEditing?: boolean
  productType: string
  size: string
  sku: string
  bottomSizes: any[]
  manufacturerSizes: any[]
}

export const VariantSizeSection: React.FC<VariantSizeSectionProps> = ({
  manufacturerSizes,
  isEditing,
  productType,
  size,
  sku,
  bottomSizes,
}) => {
  const typeSpecificFields = getTypeSpecificVariantFields(productType)
  const typeSpecificFirstRowFields = typeSpecificFields.length > 0 ? typeSpecificFields.slice(0, 2) : []
  const typeSpecificSecondRowFields = typeSpecificFields.length > 0 ? typeSpecificFields.slice(2) : []
  const firstRowFields = ["SKU", "Weight", ...typeSpecificFirstRowFields]
  const secondRowFields = ["Total count", ...typeSpecificSecondRowFields]
  const requiredFields = ["Total count"]

  const getManufacturerSizes = manufacturerSize => {
    const baseBottomSizes: string[] = uniq(
      bottomSizes
        ?.filter(size => size?.type === manufacturerSize)
        .map(size => `${size.type || ""} ${size?.value || ""}`)
    )
    baseBottomSizes.sort((a, b) => {
      const aSplit = a.split("x")
      const bSplit = b.split("x")
      return Number(aSplit?.[1]) - Number(bSplit?.[1])
    })
    baseBottomSizes.sort()
    const sizes = getFormSelectChoices(baseBottomSizes)
    return sizes
  }

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
                    disabled={isEditing && field === "Total count"}
                    type="number"
                    name={`${size}_${field.toLowerCase().replace(" ", "")}`}
                    requiredNumber={isRequired}
                    maxValue={field === "Total count" ? 99 : undefined}
                  />
                </Grid>
              )
            })}
            <Spacer grid mt={2} />
            {!!manufacturerSizes?.length &&
              manufacturerSizes.map((sizeType, index) => {
                return (
                  <Grid item key={index} xs={3}>
                    <Text variant="h5">{`Manufacturer size ${sizeType}`}</Text>
                    <Spacer mt={1} />
                    <SelectField
                      name={`${size}_manufacturerSize_${sizeType}`}
                      choices={getManufacturerSizes(sizeType)}
                    />
                    <Spacer grid mt={2} />
                  </Grid>
                )
              })}
          </Grid>
        </>
      }
    />
  )
}
