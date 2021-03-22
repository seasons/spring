import React from "react"
import { Text, Spacer } from "components"
import { Grid, Typography, Box } from "@material-ui/core"
import { Field, ChildFieldProps } from "fields/Field"

import { SearchInput, SearchType } from "components/SearchInput"

type Props = {
  size: string | null
  shopifyProductVariant: {
    externalId: string
    displayName: string
    title: string
    image: string
  } | null
}

export const VariantPriceSection: React.FC<Props> = ({ size, shopifyProductVariant }) => {
  return (
    <>
      <Grid item xs={6}>
        <Text variant="h5">Search Brand Shopify Products</Text>
        <Spacer mt={1} />
      </Grid>
      <ShopifyProductVariantSearchField
        name={`${size}_shopifyProductVariant`}
        initialValue={shopifyProductVariant || undefined}
      />
    </>
  )
}

const ExternalProductTile = ({ image, displayName, title, externalId }) => {
  return (
    <Box mb={3}>
      <img style={{ width: "100%" }} alt="" src={image ?? ""} />
      <Box display="flex" flexDirection="row" mt={1}>
        <Box flex={1}>
          <Typography variant="body2" color="textPrimary">
            {displayName}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            {title}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            {externalId}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

const ShopifyProductVariantSearchField = ({
  name,
  initialValue,
}: Omit<ChildFieldProps, "initialValue"> & { initialValue: any }) => {
  const SearchFieldRender = ({ input, meta }) => {
    const [shopifyProductVariant, setShopifyProductVariant] = React.useState({
      ...initialValue,
      image: initialValue?.image?.url,
    })

    return (
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SearchInput
            placeholder="Search Brand Shopify Products"
            searchType={SearchType.SHOPIFY_PRODUCT_VARIANT}
            onResultItemClicked={(result: any) => {
              setShopifyProductVariant(result.data)
              input.onChange({ target: { name, value: result.data } })
            }}
          />
        </Grid>
        {shopifyProductVariant && (
          <Grid item xs={3}>
            <Text variant="h6">Selected Brand Product</Text>
            <Spacer mt={1} />
            <ExternalProductTile {...(shopifyProductVariant as any)} />
          </Grid>
        )}
      </Grid>
    )
  }

  return <Field name={name} initialValue={initialValue} render={SearchFieldRender} />
}
