import gql from "graphql-tag"

export const UpdatePhysicalProductFragment = gql`
  fragment UpdatePhysicalProduct on PhysicalProduct {
    id
    barcode
    dateOrdered
    dateReceived
    inventoryStatus
    productStatus
    seasonsUID
    unitCost
    offloadMethod
    offloadNotes
    productVariant {
      id
      sku
      product {
        id
        status
        name
      }
    }
  }
`

export const PhysicalProductStatusesFragment = gql`
  fragment PhysicalProductStatuses on Query {
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
  }
`

export const PHYSICAL_PRODUCT_EDIT_QUERY = gql`
  query PhysicalProductEditQuery($where: PhysicalProductWhereUniqueInput!) {
    ...PhysicalProductStatuses
    physicalProduct(where: $where) {
      ...UpdatePhysicalProduct
    }
  }
  ${UpdatePhysicalProductFragment}
  ${PhysicalProductStatusesFragment}
`

export const PHYSICAL_PRODUCTS_WITH_WAREHOUSE_LOCATIONS_QUERY = gql`
  query GetPhysicalProductsAndWarehouseLocations {
    physicalProducts {
      id
      seasonsUID
      barcode
      warehouseLocation {
        id
        barcode
      }
    }

    warehouseLocations {
      id
      barcode
      locationCode
      itemCode
      type
    }
  }
`

export const PHYSICAL_PRODUCT_WITH_IMAGES = gql`
  query GetPhysicalProductWithImages($id: ID!) {
    physicalProduct(where: { id: $id }) {
      productVariant {
        product {
          id
          images {
            url
          }
        }
      }
    }
  }
`
