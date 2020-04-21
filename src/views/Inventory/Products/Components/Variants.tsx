import React from "react"

import { Box, Grid, styled as muiStyled } from "@material-ui/core"

import { useWizardContext } from "components/Wizard"
import { Header } from "./Header"
import { VariantSizeSection } from "./VariantSizeSection"

export interface VariantsProps {
  variants: any
  validate: (values: any) => Object
}

export const Variants: React.FC<VariantsProps> = ({ variants }) => {
  const { values } = useWizardContext()
  return (
    <Box mx={5}>
      <ContainerGrid container spacing={2}>
        <Header title="Product variants" subtitle="Confirm generated product variants" />
        {variants.map((variant, index) => (
          <VariantSizeSection variant={variant} key={index} />
        ))}
      </ContainerGrid>
    </Box>
  )
}

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})
