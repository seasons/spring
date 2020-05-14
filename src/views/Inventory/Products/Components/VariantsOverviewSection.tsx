import React from "react"

import { Box, Grid } from "@material-ui/core"
import { styled as muiStyled } from "@material-ui/core/styles"

import { Spacer, Text } from "components"
import { ExpandableSection } from "./ExpandableSection"
import { VariantSummary } from "./VariantSummary"
import { SelectField, TextField } from "fields"
import { colors } from "theme/colors"

export interface VariantsOverviewSectionProps {
  variants: any[]
}

export const VariantsOverviewSection: React.FC<VariantsOverviewSectionProps> = ({ variants }) => {
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
