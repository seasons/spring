import gql from "graphql-tag"

export const UpdatePhysicalProductFragment = gql`
  fragment UpdatePhysicalProduct on PhysicalProduct {
    id
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
      product {
        id
        status
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
