import gql from "graphql-tag"
import { ProductFragment } from "queries/Product"

export const UpdateVariantFragment = gql`
  fragment UpdateVariant on ProductVariant {
    id
    sku
    total
    weight
    product {
      id
      name
    }
    internalSize {
      id
      display
      productType
      top {
        id
        letter
        sleeve
        shoulder
        chest
        neck
        length
      }
      bottom {
        id
        type
        value
        waist
        rise
        hem
        inseam
      }
    }
    physicalProducts {
      id
      seasonsUID
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

export const GET_GENERATED_VARIANT_SKUS = gql`
  query GetGeneratedVariantSkus($input: ProductVariantSKUsInput!) {
    generatedVariantSKUs(input: $input)
  }
`
