import React from "react"

import { Grid } from "@material-ui/core"

import { ExpandableSection } from "./ExpandableSection"
import { ProductEditQuery_product_variants } from "generated/ProductEditQuery"
import { VariantSummary } from "./VariantSummary"

export interface ProductVariantsSectionProps {
  productID: string
  variants: ProductEditQuery_product_variants[]
}

export const ProductVariantsSection: React.FC<ProductVariantsSectionProps> = ({ productID, variants }) => {
  return (
    <ExpandableSection
      title="Product variants"
      content={
        <Grid container>
          {variants.map((variant, index) => (
            <VariantSummary productID={productID} variant={variant} key={index} />
          ))}
        </Grid>
      }
    />
  )
}
