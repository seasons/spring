import React from "react"
import { Box, Grid } from "@material-ui/core"
import { PhysicalProductsGrid } from "./PhysicalProductsGrid"

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
  const physicalProducts = record?.variants.map(variant => variant.physicalProducts).flat()
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
