import React from "react"

import { Box, Grid } from "@material-ui/core"
import { styled as muiStyled } from "@material-ui/core/styles"

import { Spacer, Text } from "components"
import { ExpandableSection } from "./ExpandableSection"
import { VariantSummary } from "./VariantSummary"
import { SelectField, TextField } from "fields"
import { colors } from "theme/colors"

export interface ProductVariantsSectionProps {
  variants: any[]
}

export const ProductVariantsSection: React.FC<ProductVariantsSectionProps> = ({ variants }) => {
  return (
    <ExpandableSection
      title="Product variants"
      content={
        <Grid container>
          {variants.map((variant, index) => (
            <VariantSummary variant={variant} key={index} />
          ))}
        </Grid>
      }
    />
  )
}
