import React from "react"

import { Grid } from "@material-ui/core"

import { ExpandableSection } from "./ExpandableSection"
import { ProductEditQuery_product_variants } from "generated/ProductEditQuery"
import { VariantSummary } from "./VariantSummary"

export interface ProductVariantsSectionProps {
  variants: ProductEditQuery_product_variants[]
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
