import React from "react"

import { Box, Grid, styled as muiStyled } from "@material-ui/core"

import { Spacer, Text } from "components"
import { ProductCreatePhysicalProductSection } from "./ProductCreatePhysicalProductSection"
import { getEnumValues, getFormSelectChoices } from "utils/form"

export interface ProductCreatePhysicalProductsProps {
  data: any
  skus: string[]
  validate: (values: any) => Object
}

export const ProductCreatePhysicalProducts: React.FC<ProductCreatePhysicalProductsProps> = ({ data, skus }) => {
  if (!data?.physicalProductStatuses) {
    return null
  }
  const statusChoices = getFormSelectChoices(getEnumValues(data.physicalProductStatuses))
  return (
    <Box mx={5}>
      <ContainerGrid container spacing={2}>
        <Grid item xs={12}>
          <Spacer mt={3} />
          <Text variant="h3">Physical products</Text>
          <Spacer mt={0.5} />
          <Text variant="h5" opacity={0.5}>
            Add metadata to physical products
          </Text>
          <Spacer mt={4} />
        </Grid>
        {skus.map((sku, index) => (
          <ProductCreatePhysicalProductSection sku={sku} statusChoices={statusChoices} key={index} />
        ))}
      </ContainerGrid>
    </Box>
  )
}

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})
