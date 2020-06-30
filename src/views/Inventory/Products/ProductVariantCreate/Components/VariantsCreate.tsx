import React, { useState } from "react"
import { useQuery } from "react-apollo"
import { useLocation } from "react-router-dom"

import { Box, Grid, styled as muiStyled } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"

import { Header, Loader, Spacer } from "components"
import { GetGeneratedVariantSkus } from "generated/GetGeneratedVariantSkus"
import { VariantEditQuery_productVariant } from "generated/VariantEditQuery"
import { VariantSizeSection } from "../../Components"
import {
  ProductVariantUpsertQuery_product,
  ProductVariantUpsertQuery_bottomSizes,
} from "generated/ProductVariantUpsertQuery"
import { VariantCreateSection } from "./VariantCreateSection"
import { getSizes } from "../../utils"

export interface VariantsCreateProps {
  product?: ProductVariantUpsertQuery_product
  bottomSizes?: (ProductVariantUpsertQuery_bottomSizes | null)[]
}

export const VariantsCreate: React.FC<VariantsCreateProps> = ({ bottomSizes, product }) => {
  const location = useLocation()
  const [numVariants, setNumVariants] = useState(1)

  if (!product || !bottomSizes) return null
  const sizes = getSizes({
    // productType: product.type || "",
    productType: "Bottom" || "",
    bottomSizes,
  })
  const sizeOptions = sizes.map(({ sizeType, values }) => values.map(value => ({ key: sizeType, value }))).flat()
  console.log("SIZES:", sizeOptions)

  // if (createData && (loading || !data || error)) {
  //   return <Loader />
  // }

  // if (!variantsData || !productType) {
  //   return null
  // }

  // const isEditing = !!variants
  // const title = isEditing ? variantsData[0].sku : "Product variants"
  // const subtitle = isEditing ? "Edit measurement data" : "Confirm generated product variants"
  // const breadcrumbs = [
  //   {
  //     title: "Products",
  //     url: "/inventory/products",
  //   },
  // ]

  // if (isEditing && variants && variants.length > 0) {
  //   const { product } = variants[0]
  //   breadcrumbs.push({
  //     title: product.name,
  //     url: `/inventory/products/${product.id}`,
  //   })
  // }

  // breadcrumbs.push({
  //   title: title,
  //   url: location.pathname,
  // })

  return (
    <Box>
      <Header
        title="New product variants"
        subtitle="Fill in measurement data"
        primaryButton={{
          text: "Add another variant",
          icon: <AddIcon />,
          action: () => setNumVariants(numVariants + 1),
        }}
      />
      <ContainerGrid container spacing={2}>
        {[...Array(numVariants).keys()].map(index => (
          <VariantCreateSection productType={product?.type || ""} sizeOptions={sizeOptions} variantIndex={index} />
        ))}
        {/* {variantsData.map((variant, index) => (
          <VariantSizeSection
            isEditing={isEditing}
            size={variant.size}
            sku={variant.sku}
            productType={productType}
            key={index}
          />
        ))} */}
        {/* {isEditing && (
          <>
            {variants?.map(variant => (
              <VariantPhysicalProductsSection physicalProducts={variant.physicalProducts || []} />
            ))}
            <Spacer grid mt={6} />
          </>
        )} */}
      </ContainerGrid>
    </Box>
  )
}

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})
