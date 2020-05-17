import gql from "graphql-tag"
import { ProductFragment } from "queries/Product"

export const ProductUpsertFragment = gql`
  fragment ProductUpsert on Query {
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

export const PRODUCT_EDIT_QUERY = gql`
  query ProductEditQuery($input: ProductWhereUniqueInput!) {
    ...ProductUpsert
    product(where: $input) {
      ...product
      architecture
      color {
        id
        name
      }
      functions {
        id
        name
      }
      innerMaterials
      model {
        id
        name
      }
      modelSize {
        id
        display
      }
      outerMaterials
      season
      secondaryColor {
        id
        name
      }
      status
      tags {
        id
        name
      }
      type
      variants {
        id
        sku
        internalSize {
          id
          display
          productType
          top {
            id
            letter
          }
          bottom {
            id
            value
          }
        }
        physicalProducts {
          id
          seasonsUID
          productStatus
        }
      }
    }
  }
  ${ProductUpsertFragment}
  ${ProductFragment}
`

export const PRODUCT_UPSERT_QUERY = gql`
  {
    ...ProductUpsert
  }
  ${ProductUpsertFragment}
`
