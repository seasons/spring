import gql from "graphql-tag"

export const PRODUCT_CREATE_QUERY = gql`
  query productCreateQuery {
    bottomSizes {
      value
    }

    bottomSizeTypes: __type(name: "BottomSizeType") {
      enumValues {
        name
      }
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

    tags {
      name
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
