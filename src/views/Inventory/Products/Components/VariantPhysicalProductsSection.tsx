import React from "react"

import { Grid } from "@material-ui/core"

import { ExpandableSection } from "./ExpandableSection"
import { PhysicalProductSummary } from "./PhysicalProductSummary"

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
