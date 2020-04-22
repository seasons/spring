import React from "react"
import { useQuery } from "react-apollo"
import * as yup from "yup"

import { Box, Grid, styled as muiStyled } from "@material-ui/core"

import { useWizardContext } from "components/Wizard"
import { Header } from "./Header"
import { GET_GENERATED_VARIANT_SKUS } from "../queries"
import { getTypeSpecificVariantFields, VariantSizeSection } from "./VariantSizeSection"

export const getVariantsValidationSchema = values => {
  const sizes = values?.sizes
  const productType = values?.productType

  if (!sizes || !productType) {
    return {}
  }

  const generalFields = ["Weight", "Total count"]
  const typeSpecificVariantFields = getTypeSpecificVariantFields(productType)
  const fields = [...generalFields, ...typeSpecificVariantFields]

  const schemaObject = {}
  sizes.forEach(size => {
    fields.forEach(field => {
      const fieldName = `${size}_${field.toLowerCase().replace(" ", "")}`
      schemaObject[fieldName] = yup.number().required("Required")
    })
  })

  return yup.object(schemaObject)
}

export interface VariantsProps {
  validate: (values: any) => Object
}

export const Variants: React.FC<VariantsProps> = props => {
  const { values } = useWizardContext()
  const brandID = values?.brand || ""
  const colorID = values?.color || ""
  const sizeNames = values?.sizes || []
  const productType = values?.productType

  const { data, loading, error } = useQuery(GET_GENERATED_VARIANT_SKUS, {
    variables: {
      input: {
        brandID,
        colorID,
        sizeNames,
      },
    },
  })

  if (loading) {
    return <div>Loading</div>
  }

  const variantSKUs = data?.generatedVariantSKUs

  if (!variantSKUs || error || !productType) {
    return null
  }

  return (
    <Box mx={5}>
      <ContainerGrid container spacing={2}>
        <Header title="Product variants" subtitle="Confirm generated product variants" />
        {variantSKUs.map((sku, index) => (
          <VariantSizeSection size={sizeNames[index]} sku={sku} productType={productType} key={index} />
        ))}
      </ContainerGrid>
    </Box>
  )
}

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})
