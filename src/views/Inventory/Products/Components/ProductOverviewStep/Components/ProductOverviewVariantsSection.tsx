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
  productType: string
}

export const ProductOverviewVariantsSection: React.FC<ProductOverviewVariantsSectionProps> = ({
  productID,
  variants,
  productType,
}) => {
  const redirect = useRedirect()
  const isUniversalSize = variants?.[0]?.internalSize?.display === "Universal"
  const disableCreateNew = isUniversalSize && variants?.length > 0

  return (
    <ExpandableSection
      title="Product variants"
      primaryButton={
        disableCreateNew
          ? null
          : {
              text: "Create new",
              icon: <AddIcon />,
              action: () => redirect(`/inventory/product/${productID}/variant/new`),
            }
      }
      content={
        <Grid container>
          {variants.map((variant, index) => (
            <ProductOverviewVariantSummary variant={variant} key={index} productType={productType} />
          ))}
        </Grid>
      }
    />
  )
}
