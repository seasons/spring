import React from "react"
import { useQuery } from "react-apollo"

import { Box, Grid, styled as muiStyled } from "@material-ui/core"

import { GET_GENERATED_VARIANT_SKUS } from "../queries"
import { Header } from "./Header"
import { VariantSizeSection } from "./VariantSizeSection"

export interface VariantsProps {
  values: any
}

export const Variants: React.FC<VariantsProps> = ({ values }) => {
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
