import React from "react"
import { Grid } from "@material-ui/core"
import { ExpandableSection } from "./ExpandableSection"
import { VariantEditQuery_productVariant_physicalProducts } from "generated/VariantEditQuery"
import { PhysicalProductSummary } from "views/Inventory/PhysicalProducts/Components"

export interface VariantPhysicalProductsSectionProps {
  physicalProducts: VariantEditQuery_productVariant_physicalProducts[]
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
