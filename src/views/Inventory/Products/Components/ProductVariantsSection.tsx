import React from "react"
import { useRedirect } from "@seasons/react-admin"

import { Grid } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"

import { ExpandableSection } from "./ExpandableSection"
import { ProductEditQuery_product_variants } from "generated/ProductEditQuery"
import { VariantSummary } from "./VariantSummary"
import { SnackbarState } from "components/Snackbar"

export interface ProductVariantsSectionProps {
  productID: string
  variants: ProductEditQuery_product_variants[]
  toggleSnackbar?: (state: SnackbarState) => void
}

export const ProductVariantsSection: React.FC<ProductVariantsSectionProps> = ({
  productID,
  variants,
  toggleSnackbar,
}) => {
  const redirect = useRedirect()
  return (
    <ExpandableSection
      title="Product variants"
      primaryButton={{
        text: "Create new product variants",
        icon: <AddIcon />,
        action: () => redirect(`/inventory/product/${productID}/variant/new`),
      }}
      content={
        <Grid container>
          {variants.map((variant, index) => (
            <VariantSummary variant={variant} key={index} toggleSnackbar={toggleSnackbar} />
          ))}
        </Grid>
      }
    />
  )
}
