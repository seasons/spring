import React from "react"
import { useRedirect } from "@seasons/react-admin"

import { Grid } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"

import { ExpandableSection } from "components/ExpandableSection"
import { ProductEditQuery_product_variants } from "generated/ProductEditQuery"
import { ProductOverviewVariantSummary } from "./ProductOverviewVariantSummary"

export interface ProductOverviewVariantsSectionProps {
  productID: string
  variants: ProductEditQuery_product_variants[]
}

export const ProductOverviewVariantsSection: React.FC<ProductOverviewVariantsSectionProps> = ({
  productID,
  variants,
}) => {
  const redirect = useRedirect()
  return (
    <ExpandableSection
      title="Product variants"
      primaryButton={{
        text: "Create new",
        icon: <AddIcon />,
        action: () => redirect(`/inventory/product/${productID}/variant/new`),
      }}
      content={
        <Grid container>
          {variants.map((variant, index) => (
            <ProductOverviewVariantSummary variant={variant} key={index} />
          ))}
        </Grid>
      }
    />
  )
}
