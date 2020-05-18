import React from "react"
import { useHistory } from "react-router-dom"

import { Box, Grid } from "@material-ui/core"
import { styled as muiStyled } from "@material-ui/core/styles"

import { Separator, Spacer, Text } from "components"
import { colors } from "theme/colors"

export interface PhysicalProductSummaryProps {
  physicalProduct: any
}

export const PhysicalProductSummary: React.FC<PhysicalProductSummaryProps> = ({ physicalProduct }) => {
  const history = useHistory()

  const onClickView = () => {
    history.push(`/inventory/product/variant/physicalProducts/${physicalProduct.id}`)
  }

  console.log("PHYSICAL PRODUCT", physicalProduct)

  return (
    <Grid item xs={6}>
      <Container px={2} py={3} display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between">
          <Text variant="h5">{physicalProduct.seasonsUID}</Text>
          <Box
            px={2}
            py={0.5}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor={colors.white95}
            borderRadius={20}
            style={{ cursor: "pointer" }}
            onClick={onClickView}
          >
            <Text variant="h6">View</Text>
          </Box>
        </Box>
        <Spacer mt={3} />
        <Separator />
        <Spacer mt={3} />
        <Box display="flex" flexDirection="column">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Text variant="h5" style={{ flexGrow: 1 }}>
                Status
              </Text>
              <Spacer mt={2} />
              <PhysicalProductField>
                <Text variant="h6">{physicalProduct.productStatus}</Text>
              </PhysicalProductField>
            </Grid>
            <Grid item xs={6}>
              <Text variant="h5" style={{ flexGrow: 1 }}>
                Inventory status
              </Text>
              <Spacer mt={2} />
              <PhysicalProductField>
                <Text variant="h6">{physicalProduct.inventoryStatus}</Text>
              </PhysicalProductField>
            </Grid>
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
