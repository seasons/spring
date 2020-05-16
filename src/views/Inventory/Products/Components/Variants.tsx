import React from "react"
import { useQuery } from "react-apollo"

import { Box, Grid, styled as muiStyled } from "@material-ui/core"

import { GET_GENERATED_VARIANT_SKUS } from "../queries"
import { Header } from "./Header"
import { VariantSizeSection } from "./VariantSizeSection"

export interface VariantsProps {
  values?: any
  variants?: any[]
}

export const Variants: React.FC<VariantsProps> = ({ values, variants }) => {
  const brandID = values?.brand || ""
  const colorID = values?.color || ""
  const sizeNames = values?.sizes || []
  const productType = values?.productType || variants?.[0]?.internalSize?.productType

  const { data, loading, error } = useQuery(GET_GENERATED_VARIANT_SKUS, {
    variables: {
      input: {
        brandID,
        colorID,
        sizeNames,
      },
    },
  })

  if (values && (loading || !data || error)) {
    return <div>Loading</div>
  }

  let variantsData
  if (values && data) {
    variantsData = data.generatedVariantSKUs.map((sku, index) => ({
      sku,
      size: sizeNames[index],
    }))
  } else if (variants) {
    variantsData = variants.map((variant, index) => ({
      sku: variant.sku,
      size: variant.internalSize.display,
    }))
  } else {
    return null
  }

  if (!variantsData || !productType) {
    return null
  }

  return (
    <Box>
      <ContainerGrid container spacing={2}>
        <Header title="Product variants" subtitle="Confirm generated product variants" />
        {variantsData.map((variant, index) => (
          <VariantSizeSection size={variant.size} sku={variant.sku} productType={productType} key={index} />
        ))}
      </ContainerGrid>
    </Box>
  )
}

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})
