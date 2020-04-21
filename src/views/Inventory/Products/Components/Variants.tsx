import React from "react"
import * as yup from "yup"

import { Box, Grid, styled as muiStyled } from "@material-ui/core"

import { useWizardContext } from "components/Wizard"
import { Header } from "./Header"
import { getTypeSpecificVariantFields, VariantSizeSection } from "./VariantSizeSection"

export const getVariantsValidationSchema = values => {
  // TODO: Remove mock SKUs
  const skus = ["STIS-PNK-SS-015", "STIS-PNK-SS-015", "STIS-PNK-SS-015"]
  const productType = values?.productType
  const generalFields = ["Weight", "Total count"]
  const typeSpecificVariantFields = getTypeSpecificVariantFields(productType)
  const fields = [...generalFields, ...typeSpecificVariantFields]

  const schemaObject = {}
  skus.forEach(sku => {
    fields.forEach(field => {
      const fieldName = `${sku}_${field.toLowerCase().replace(" ", "")}`
      schemaObject[fieldName] = yup.number().required("Required")
    })
  })

  return yup.object(schemaObject)
}
export interface VariantsProps {
  variants: any
  validate: (values: any) => Object
}

export const Variants: React.FC<VariantsProps> = ({ variants }) => {
  const { values } = useWizardContext()
  return (
    <Box mx={5}>
      <ContainerGrid container spacing={2}>
        <Header title="Product variants" subtitle="Confirm generated product variants" />
        {variants.map((variant, index) => (
          <VariantSizeSection variant={variant} key={index} />
        ))}
      </ContainerGrid>
    </Box>
  )
}

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})
