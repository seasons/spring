import gql from "graphql-tag"

export const PRODUCT_CREATE_QUERY = gql`
  query productCreateQuery {
    bottomSizes {
      value
    }

    brands(orderBy: name_ASC) {
      id
      brandCode
      name
      slug
    }

    categories {
      id
      name
    }

    colors(orderBy: name_ASC) {
      id
      colorCode
      hexCode
      name
    }

    inventoryStatuses: __type(name: "InventoryStatus") {
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
      innerMaterials
      outerMaterials
      tags {
        name
      }
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
