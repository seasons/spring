import React from "react"
import { Box, Grid } from "@material-ui/core"
import { VariantSummary } from "../Components"
import { PhysicalProductsGrid } from "./PhysicalProductsGrid"

interface ExpandedRowProps {
  id?: string
  record?: any
  resource?: string
}

export const ExpandedRow: React.FC<ExpandedRowProps> = ({ id, record, resource }) => {
  console.log("RECORD:", record)
  const physicalProducts = record?.variants.map(variant => variant.physicalProducts).flat()
  return (
    <Box my={2}>
      <Grid container spacing={3}>
        <PhysicalProductsGrid physicalProducts={physicalProducts} />
      </Grid>
    </Box>
  )
}
