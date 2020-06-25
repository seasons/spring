import React from "react"
import { Box, Grid } from "@material-ui/core"
import { VariantSummary } from "../Components"
import { PhysicalProductsGrid } from "./PhysicalProductsGrid"
import Product from "queries/Product"

interface ExpandedRowProps {
  id?: string
  record?: any
  resource?: string
  setUpdatingPhysicalProduct: (physicalProduct: any) => void
}

export const ExpandedRow: React.FC<ExpandedRowProps> = ({ id, record, resource, setUpdatingPhysicalProduct }) => {
  console.log("RECORD:", record)
  const physicalProducts = record?.variants
    .map(variant => variant.physicalProducts.map(product => ({ ...product, variantID: variant.id })))
    .flat()
  return (
    <Box my={2}>
      <Grid container spacing={3}>
        <PhysicalProductsGrid
          physicalProducts={physicalProducts}
          setUpdatingPhysicalProduct={setUpdatingPhysicalProduct}
        />
      </Grid>
    </Box>
  )
}
