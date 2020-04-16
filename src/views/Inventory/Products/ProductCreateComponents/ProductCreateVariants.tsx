import React, { useState } from "react"

import { Box, Grid, styled as muiStyled } from "@material-ui/core"

import { Spacer, Text } from "components"
import { useWizard } from "components/Wizard"

export interface ProductCreateVariantsProps {
  variants: any
  validate: (values: any) => Object
}

export const ProductCreateVariants: React.FC<ProductCreateVariantsProps> = ({ variants }) => {
  const { values } = useWizard()
  return (
    <Box mx={5}>
      <ContainerGrid container spacing={2}>
        <Grid item xs={12}>
          <Spacer mt={3} />
          <Text variant="h3">Product variants</Text>
          <Spacer mt={0.5} />
          <Text variant="h5" opacity={0.5}>
            Confirm generated product variants
          </Text>
          <Spacer mt={4} />
        </Grid>
        {variants.map((variant, index) => (
          <Grid key={index} item xs={12}>
            <Text variant="h6">{variant.size}</Text>
          </Grid>
        ))}
      </ContainerGrid>
    </Box>
  )
}

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})
