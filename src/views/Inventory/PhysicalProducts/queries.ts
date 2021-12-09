import gql from "graphql-tag"

export const GET_GENERATED_SEASONS_UIDS = gql`
  query GetGeneratedSeasonsUIDs($input: PhysicalProductSeasonsUIDsInput!) {
    generatedSeasonsUIDs(input: $input)
  }
`

export const UpdatePhysicalProductFragment = gql`
  fragment UpdatePhysicalProduct on PhysicalProduct {
    id
    barcode
    barcoded
    dateOrdered
    dateReceived
    inventoryStatus
    productStatus
    seasonsUID
    unitCost
    offloadMethod
    offloadNotes
    price {
      id
      buyUsedEnabled
      buyUsedPrice
    }
    warehouseLocation {
      id
      barcode
      type
      itemCode
      locationCode
      createdAt
      updatedAt
    }
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

export const PHYSICAL_PRODUCT_VIEW_QUERY = gql`
  query PhysicalProductEditQuery($where: PhysicalProductWhereUniqueInput!) {
    ...PhysicalProductStatuses
    physicalProduct(where: $where) {
      ...UpdatePhysicalProduct
    }
  }
  ${UpdatePhysicalProductFragment}
  ${PhysicalProductStatusesFragment}
`

export const WAREHOUSE_LOCATIONS_QUERY = gql`
  query GetAllWarehouseLocations {
    warehouseLocations {
      id
      barcode
      locationCode
      itemCode
      type
    }
  }
`

export const PHYSICAL_PRODUCT_FOR_STOW = gql`
  query GetPhysicalProductForStow($sequenceNumber: Int!) {
    physicalProduct(where: { sequenceNumber: $sequenceNumber }) {
      id
      seasonsUID
      warehouseLocation {
        id
        barcode
      }
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
