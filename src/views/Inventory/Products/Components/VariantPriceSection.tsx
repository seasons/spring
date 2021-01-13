import React from "react"
import { Text, Spacer } from "components"
import { Grid } from "@material-ui/core"
import { TextField, CheckboxField } from "fields"

type Props = {
  isEditing: boolean
  price: {
    buyUsedEnabled: boolean
    buyUsedPrice: number | null
  }
  size: string | null
  shopifyProductVariantExternalId: string | null
}

export const VariantPriceSection: React.FC<Props> = ({ isEditing, price, size, shopifyProductVariantExternalId }) => {
  return (
    <>
      <Grid item xs={3} direction="row" alignItems="center" container>
        <Text variant="h5">Buy Used Enabled</Text>
        <CheckboxField
          name={`${size}_priceBuyUsedEnabled`}
          disabled={isEditing}
          initialValue={price?.buyUsedEnabled}
          inputProps={{
            title: "Edit the physical product to update buy used enabled status.",
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <Text variant="h5">Buy Used Price</Text>
        <Spacer mt={1} />
        <TextField
          name={`${size}_priceBuyUsedPrice`}
          type="number"
          optionalNumber
          disabled={isEditing}
          value={price?.buyUsedPrice}
          inputProps={{
            title: "Edit the physical product to update buy used price.",
          }}
        />
      </Grid>
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
