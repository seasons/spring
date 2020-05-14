import React from "react"

import { Box, Grid } from "@material-ui/core"
import { styled as muiStyled } from "@material-ui/core/styles"

import { Separator, Spacer, Text } from "components"
import { colors } from "theme/colors"

export interface VariantSummaryProps {
  variant: any
}

export const VariantSummary: React.FC<VariantSummaryProps> = ({ variant }) => {
  return (
    <Grid item xs={12}>
      <Spacer mt={3} />
      <Text variant="h4">{variant.internalSize.display}</Text>
      <Spacer mt={3} />
      <Container px={2} py={3} display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" flexDirection="column">
            <Text variant="h5">{variant.sku}</Text>
            <Text variant="h5" opacity={0.5}>
              Total count: {variant.physicalProducts.length}
            </Text>
          </Box>
          <Box
            px={2}
            py={0.5}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor={colors.white95}
            borderRadius={20}
            onClick={() => {}}
          >
            <Text variant="h6">View</Text>
          </Box>
        </Box>
        <Spacer mt={3} />
        <Separator />
        <Spacer mt={3} />
        <Box display="flex" flexDirection="column">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex">
                <Text variant="h5" style={{ flexGrow: 1 }}>
                  SUID
                </Text>
                <Spacer ml={2} />
                <Text variant="h5" style={{ flexGrow: 1 }}>
                  Status
                </Text>
              </Box>
            </Grid>
            {variant.physicalProducts.map((physicalProduct, index) => (
              <React.Fragment key={index}>
                <Grid item xs={6}>
                  <PhysicalProductField>
                    <Text variant="h6">{physicalProduct.seasonsUID}</Text>
                  </PhysicalProductField>
                </Grid>
                <Grid item xs={6}>
                  <PhysicalProductField>
                    <Text variant="h6">{physicalProduct.productStatus}</Text>
                  </PhysicalProductField>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Box>
      </Container>
    </Grid>
  )
}

const Container = muiStyled(Box)({
  borderRadius: 4,
  border: `solid 1px ${colors.white90}`,
})

const PhysicalProductField = muiStyled(Box)({
  padding: "14px 16px",
  backgroundColor: colors.white95,
  borderRadius: 4,
})
