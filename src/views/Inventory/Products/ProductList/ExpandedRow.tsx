import React from "react"
import { Box, Grid } from "@material-ui/core"
import { VariantSummary } from "../Components"

interface ExpandedRowProps {
  id?: string
  record?: any
  resource?: string
}

export const ExpandedRow: React.FC<ExpandedRowProps> = ({ id, record, resource }) => {
  return (
    <Box my={2}>
      <Grid container spacing={3}>
        {record?.variants.map((variant, index) => (
          <Grid item md={4}>
            <VariantSummary variant={variant} key={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
