import gql from "graphql-tag"

export const UpdateVariantFragment = gql`
  fragment UpdateVariant on ProductVariant {
    id
    sku
    total
    weight
    manufacturerSizes {
      id
      display
      type
      productType
    }
    product {
      id
      name
      brand {
        id
      }
    }
    internalSize {
      id
      display
      productType
      top {
        id
        sleeve
        shoulder
        chest
        neck
        length
      }
      bottom {
        id
        waist
        rise
        hem
        inseam
      }
    }
    price {
      id
      buyUsedEnabled
      buyUsedPrice
    }
    shopifyProductVariant {
      id
      externalId
      displayName
      image {
        url
      }
      title
    }
    physicalProducts {
      id
      seasonsUID
      productStatus
      inventoryStatus
      price {
        id
        buyUsedEnabled
        buyUsedPrice
      }
    }
  }
`

export const VARIANT_EDIT_QUERY = gql`
  query VariantEditQuery($where: ProductVariantWhereUniqueInput!) {
    productVariant(where: $where) {
      ...UpdateVariant
    }
  }
  ${UpdateVariantFragment}
`

export const GET_VARIANT_SKUS_AND_SIZE_TYPES = gql`
  query GetGeneratedVariantSkus($input: ProductVariantSKUsInput!) {
    generatedVariantSKUs(input: $input)
  }
`
