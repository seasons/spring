import gql from "graphql-tag"
import { ProductFragment } from "queries/Product"

export const VARIANT_EDIT_QUERY = gql`
  query VariantEditQuery($where: ProductVariantWhereUniqueInput!) {
    productVariant(where: $where) {
      id
      sku
      weight
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
  }
`

export const GET_GENERATED_VARIANT_SKUS = gql`
  query GetGeneratedVariantSkus($input: ProductVariantSKUsInput!) {
    generatedVariantSKUs(input: $input)
  }
`
