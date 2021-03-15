import React from "react"
import { Text, Spacer } from "components"
import { Grid } from "@material-ui/core"
import { TextField } from "fields"

type Props = {
  size: string | null
  shopifyProductVariantExternalId: string | null
}

export const VariantPriceSection: React.FC<Props> = ({ size, shopifyProductVariantExternalId }) => {
  return (
    <>
      <Grid item xs={3}>
        <Text variant="h5">Shopify External ID</Text>
        <Spacer mt={1} />
        <TextField
          name={`${size}_shopifyProductVariantExternalId`}
          type="text"
          initialValue={shopifyProductVariantExternalId || undefined}
          inputProps={{
            title: "The ID of the product variant on the brand Shopify instance.",
          }}
        />
      </Grid>
    </>
  )
}

const ShopifyProductVariantSelect: React.FC<{ onClick: (shopifyProductVariantExternalId: string) => void }> = ({ onClick }) => (

)
