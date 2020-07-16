import gql from "graphql-tag"
import { ProductFragment as AdminProductFragment } from "queries/Product"

export const ProductUpsertFragment = gql`
  fragment ProductUpsert on Query {
    bottomSizes {
      type
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

    productMaterialCategories {
      id
      slug
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
  }
`

export const ProductFragment = gql`
  fragment ProductFragment on Product {
    ...product
    publishedAt
    architecture
    color {
      id
      colorCode
      name
    }
    functions {
      id
      name
    }
    innerMaterials
    materialCategory {
      id
      slug
    }
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
      colorCode
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
        inventoryStatus
        offloadMethod
        offloadNotes
      }
    }
  }
  ${AdminProductFragment}
`

export const PRODUCT_VARIANT_UPSERT_QUERY = gql`
  query ProductVariantUpsertQuery($input: ProductWhereUniqueInput!) {
    bottomSizes {
      type
      value
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

    product(where: $input) {
      ...ProductFragment
    }
  }
  ${ProductFragment}
`

export const PRODUCT_EDIT_QUERY = gql`
  query ProductEditQuery($input: ProductWhereUniqueInput!) {
    ...ProductUpsert
    product(where: $input) {
      ...ProductFragment
    }
  }
  ${ProductUpsertFragment}
  ${ProductFragment}
`

export const PRODUCT_UPSERT_QUERY = gql`
  query ProductUpsertQuery {
    ...ProductUpsert
  }
  ${ProductUpsertFragment}
`
