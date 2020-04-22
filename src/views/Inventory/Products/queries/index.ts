import gql from "graphql-tag"

export const PRODUCT_CREATE_QUERY = gql`
  query productCreateQuery {
    bottomSizes {
      value
    }

    brands {
      id
      brandCode
      name
      slug
    }

    categories {
      id
      name
    }

    colors {
      id
      colorCode
      hexCode
      name
    }

    materials: __type(name: "Material") {
      enumValues {
        name
      }
    }

    physicalProductStatuses: __type(name: "PhysicalProductStatus") {
      enumValues {
        name
      }
    }

    products {
      tags
    }

    productArchitectures: __type(name: "ProductArchitecture") {
      enumValues {
        name
      }
    }

    productFunctions {
      id
      name
    }

    productModels {
      id
      name
    }

    productTypes: __type(name: "ProductType") {
      enumValues {
        name
      }
    }

    topSizes {
      letter
    }
  }
`

export const GET_GENERATED_VARIANT_SKUS = gql`
  query GetGeneratedVariantSkus($input: ProductVariantSKUsInput!) {
    generatedVariantSKUs(input: $input)
  }
`
