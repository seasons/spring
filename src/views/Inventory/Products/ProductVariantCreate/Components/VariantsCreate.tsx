import React, { useState } from "react"
import { useLocation } from "react-router-dom"

import { Box, Grid, styled as muiStyled } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"

import { Header } from "components"
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
    productType: product.type || "",
    bottomSizes,
  })
  const sizeOptions = sizes.map(({ sizeType, values }) => values.map(value => ({ key: sizeType, value }))).flat()

  const title = "New product variants"
  const breadcrumbs = [
    {
      title: "Products",
      url: "/inventory/products",
    },
    {
      title: product.name,
      url: `/inventory/products/${product.id}`,
    },
    {
      title: title,
      url: location.pathname,
    },
  ]

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
        breadcrumbs={breadcrumbs}
      />
      <ContainerGrid container spacing={2}>
        {[...Array(numVariants).keys()].map(index => (
          <VariantCreateSection productType={product?.type || ""} sizeOptions={sizeOptions} variantIndex={index} />
        ))}
      </ContainerGrid>
    </Box>
  )
}

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})
