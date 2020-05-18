import React from "react"

import { Box, Grid } from "@material-ui/core"
import { styled as muiStyled } from "@material-ui/core/styles"

import { Spacer, Text } from "components"
import { ExpandableSection } from "./ExpandableSection"
import { PhysicalProductSummary } from "./PhysicalProductSummary"
import { VariantSummary } from "./VariantSummary"
import { SelectField, TextField } from "fields"
import { colors } from "theme/colors"

export interface VariantPhysicalProductsSectionProps {
  physicalProducts: any[]
}

export const VariantPhysicalProductsSection: React.FC<VariantPhysicalProductsSectionProps> = ({ physicalProducts }) => {
  return (
    <ExpandableSection
      title="Physical products"
      content={
        <Grid container>
          {physicalProducts.map((physProd, index) => (
            <PhysicalProductSummary physicalProduct={physProd} key={index} />
          ))}
        </Grid>
      }
    />
  )
}
