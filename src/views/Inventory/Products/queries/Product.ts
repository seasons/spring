import gql from "graphql-tag"
import { ProductFragment as AdminProductFragment } from "queries/Product"

export const ProductUpsertFragment = gql`
  fragment ProductUpsert on Query {
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
    externalURL
    architecture
    photographyStatus
    innerMaterials
    outerMaterials
    status
    type
    productFit
    buyNewEnabled
    buyUsedEnabled
    buyUsedPrice
    season {
      id
      internalSeason {
        id
        year
        seasonCode
      }
      vendorSeason {
        id
        year
        seasonCode
      }
      wearableSeasons
    }
    tier {
      id
      tier
      price
    }
    color {
      id
      colorCode
      name
    }
    functions {
      id
      name
    }
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
    secondaryColor {
      id
      colorCode
      name
    }
    tags {
      id
      name
    }
    variants {
      id
      sku
      manufacturerSizes {
        id
        type
        productType
      }
      internalSize {
        id
        display
        productType
      }
      product {
        id
      }
      physicalProducts {
        id
        seasonsUID
        productStatus
        inventoryStatus
        offloadMethod
        offloadNotes
        warehouseLocation {
          id
          barcode
        }
      }
    }
  }
  ${AdminProductFragment}
`

export const PRODUCT_VARIANT_UPSERT_QUERY = gql`
  query ProductVariantUpsertQuery($input: ProductWhereUniqueInput!) {
    inventoryStatuses: __type(name: "InventoryStatus") {
      enumValues {
        name
      }
    }

    product(where: $input) {
      slug
      ...ProductFragment
    }
  }
  ${ProductFragment}
`

export const PHYSICAL_PRODUCT_STATUSES_QUERY = gql`
  query PhysicalProductStatusesQuery {
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

    offloadMethods: __type(name: "PhysicalProductOffloadMethod") {
      enumValues {
        name
      }
    }
  }
`
export const PRODUCT_EDIT_QUERY = gql`
  query ProductEditQuery($input: ProductWhereUniqueInput!) {
    categories(where: { children_every: { id: null } }, orderBy: name_ASC) {
      id
      name
    }
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
    categories(where: { children_every: { id: null } }, orderBy: name_ASC) {
      id
      name
    }
    ...ProductUpsert
  }
  ${ProductUpsertFragment}
`
