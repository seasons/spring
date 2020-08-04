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
      productType
    }
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
      productStatus
      inventoryStatus
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
    bottomSizeTypes: __type(name: "BottomSizeType") {
      enumValues {
        name
      }
    }
    bottomSizes {
      type
      value
    }
    generatedVariantSKUs(input: $input)
  }
`

export const GET_GENERATED_SEASONS_UIDS = gql`
  query GetGeneratedSeasonsUIDs($input: PhysicalProductSeasonsUIDsInput!) {
    generatedSeasonsUIDs(input: $input)
  }
`
