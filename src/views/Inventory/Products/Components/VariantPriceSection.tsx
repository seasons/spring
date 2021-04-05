import React from "react"
import styled from "styled-components"
import { Text, Spacer, Image } from "components"
import { Grid, Typography, Box, IconButton } from "@material-ui/core"
import { Field, ChildFieldProps } from "fields/Field"
import CloseIcon from "@material-ui/icons/Close"

import { SearchInput, SearchType } from "components/SearchInput"

type Props = {
  size: string | null
  brandID: string
  shopifyProductVariant: {
    externalId: string
    displayName: string
    title: string
    image: string
  } | null
}

export const VariantPriceSection: React.FC<Props> = ({ size, shopifyProductVariant, brandID }) => {
  return (
    <>
      <Grid item xs={6}>
        <Text variant="h5">Brand Shopify Product</Text>
        <Spacer mt={1} />
      </Grid>
      <ShopifyProductVariantSearchField
        name={`${size}_shopifyProductVariant`}
        initialValue={shopifyProductVariant || undefined}
        brandID={brandID}
      />
    </>
  )
}

const ExternalProductTile = ({ image, displayName, title, externalID, onRemove }) => {
  return (
    <Box mb={3} position="relative">
      <RemoveWrapper>
        <IconButton aria-label="close" onClick={() => onRemove()}>
          <CloseIcon />
        </IconButton>
      </RemoveWrapper>
      <Image url={image} size="large" />
      <Box display="flex" flexDirection="row" mt={1}>
        <Box flex={1}>
          <Typography variant="body2" color="textPrimary">
            {displayName}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            {title}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            {externalID}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

const ShopifyProductVariantSearchField = ({
  name,
  initialValue,
  brandID,
}: Omit<ChildFieldProps, "initialValue"> & { initialValue: any; brandID: string }) => {
  const SearchFieldRender = ({ input, meta }) => {
    const [shopifyProductVariant, setShopifyProductVariant] = React.useState({
      ...initialValue,
      image: initialValue?.image?.url,
    })

    const handleChange = value => {
      setShopifyProductVariant(value)
      input.onChange({ target: { name, value: { externalId: value.externalID } } })
    }

    return (
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SearchInput
            placeholder="Search Brand Shopify Products"
            searchType={SearchType.SHOPIFY_PRODUCT_VARIANT}
            onFilterResults={results =>
              brandID ? results?.filter(result => result.data.brandID === brandID) : results
            }
            onResultItemClicked={(result: any) => {
              handleChange(result.data)
            }}
          />
        </Grid>
        {shopifyProductVariant && shopifyProductVariant.externalID && (
          <Grid item xs={3}>
            <ExternalProductTile
              {...(shopifyProductVariant as any)}
              onRemove={() => {
                handleChange({ externalID: null })
              }}
            />
          </Grid>
        )}
      </Grid>
    )
  }

  return <Field name={name} initialValue={initialValue} render={SearchFieldRender} />
}

const RemoveWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`
