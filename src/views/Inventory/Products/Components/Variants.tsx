import React from "react"
import { useQuery } from "react-apollo"

import { Box, Grid, styled as muiStyled } from "@material-ui/core"

import { Spacer } from "components"
import { GET_GENERATED_VARIANT_SKUS } from "../queries"
import { Header } from "./Header"
import { VariantPhysicalProductsSection } from "./VariantPhysicalProductsSection"
import { VariantSizeSection } from "./VariantSizeSection"

export interface VariantsProps {
  createData?: any // Passed in when creating new variants
  variants?: any[] // Passed in when editing variants
}

export const Variants: React.FC<VariantsProps> = ({ createData, variants }) => {
  const brandID = createData?.brand || ""
  const colorID = createData?.color || ""
  const sizeNames = createData?.sizes || []
  const productType = createData?.productType || variants?.[0]?.internalSize?.productType

  const { data, loading, error } = useQuery(GET_GENERATED_VARIANT_SKUS, {
    variables: {
      input: {
        brandID,
        colorID,
        sizeNames,
      },
    },
  })

  if (createData && (loading || !data || error)) {
    return <div>Loading</div>
  }

  let variantsData
  if (createData && data) {
    // Get variants data from createData and query
    variantsData = data.generatedVariantSKUs.map((sku, index) => ({
      sku,
      size: sizeNames[index],
    }))
  } else if (variants) {
    // Get variants data from the already existing variants
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

  const isEditing = !!variants
  const title = isEditing ? variantsData[0].sku : "Product variants"
  const subtitle = isEditing ? "Edit measurement createData" : "Confirm generated product variants"

  return (
    <Box>
      <ContainerGrid container spacing={2}>
        <Header title={title} subtitle={subtitle} />
        {variantsData.map((variant, index) => (
          <VariantSizeSection
            isEditing={isEditing}
            size={variant.size}
            sku={variant.sku}
            productType={productType}
            key={index}
          />
        ))}
        {isEditing && (
          <>
            {variants?.map(variant => (
              <VariantPhysicalProductsSection physicalProducts={variant.physicalProducts} />
            ))}
            <Spacer grid mt={6} />
          </>
        )}
      </ContainerGrid>
    </Box>
  )
}

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})
