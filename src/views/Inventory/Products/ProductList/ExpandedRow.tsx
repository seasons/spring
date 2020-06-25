import React from "react"
import { Box, Grid } from "@material-ui/core"
import { VariantSummary } from "../Components"
import { PhysicalProductsGrid } from "./PhysicalProductsGrid"
import Product from "queries/Product"
import { PhysicalProduct } from "generated/PhysicalProduct"

interface ExpandedRowProps {
  id?: string
  record?: any
  resource?: string
  setUpdatingStatusForPhysicalProduct: (physicalProduct: any) => void
  setOffloadingPhysicalProduct: (PhysicalProduct: any) => void
}

export const ExpandedRow: React.FC<ExpandedRowProps> = ({
  id,
  record,
  resource,
  setUpdatingStatusForPhysicalProduct,
  setOffloadingPhysicalProduct,
}) => {
  console.log("RECORD:", record)
  const physicalProducts = record?.variants
    .map(variant => variant.physicalProducts.map(product => ({ ...product, variantID: variant.id })))
    .flat()
  return (
    <Box my={2}>
      <Grid container spacing={3}>
        <PhysicalProductsGrid
          physicalProducts={physicalProducts}
          setUpdatingStatusForPhysicalProduct={setUpdatingStatusForPhysicalProduct}
          setOffloadingPhysicalProduct={setOffloadingPhysicalProduct}
        />
      </Grid>
    </Box>
  )
}
