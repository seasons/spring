import { GET_ONE, GET_LIST } from "@seasons/react-admin"
import gql from "graphql-tag"

const GetOneFragment = gql`
  fragment PhysicalProduct on PhysicalProduct {
    id
    seasonsUID
    inventoryStatus
    offloadMethod
    sequenceNumber
    unitCost
    dateOrdered
    dateReceived
    productStatus
    createdAt
    barcoded
    barcode
    adminLogs {
      action
      triggeredAt
      changedFields
      rowData
      entityId
      interpretation {
        id
        interpretation
      }
      activeAdminUser {
        id
        fullName
      }
    }
    price {
      id
      buyUsedPrice
      buyUsedEnabled
    }
    reservations(orderBy: createdAt_DESC) {
      id
      customer {
        id
        user {
          id
          firstName
          lastName
          email
        }
      }
      statusUpdatedAt
      reservationNumber
      shipped
      status
      shippedAt
      receivedAt
      createdAt
      phase
      images(size: Thumb) {
        url
      }
      products {
        id
      }
    }
    warehouseLocation {
      id
      barcode
      locationCode
      itemCode
      type
    }
    reports {
      id
      damageType
      createdAt
      notes
      score
      published
      user {
        id
        fullName
      }
    }
    productVariant {
      id
      sku
      internalSize {
        id
        display
      }
      retailPrice

      product {
        id
        name
        publishedAt
        category {
          id
          name
        }
        createdAt
        brand {
          id
          name
        }
        architecture
        materialCategory {
          id
          slug
        }
        photographyStatus
        status
      }
    }
  }
`
export const PhysicalProductFragment = gql`
  fragment PhysicalProduct on PhysicalProduct {
    id
    seasonsUID
    inventoryStatus
    offloadMethod
    sequenceNumber
    unitCost
    dateOrdered
    dateReceived
    productStatus
    createdAt
    barcoded
    barcode
    amountRecouped
    price {
      id
      buyUsedPrice
      buyUsedEnabled
    }
    reservations(orderBy: createdAt_DESC) {
      id
      customer {
        id
        user {
          id
          firstName
          lastName
          email
        }
      }
      statusUpdatedAt
      reservationNumber
      shipped
      status
      shippedAt
      receivedAt
      createdAt
      phase
      images(size: Thumb) {
        url
      }
      products {
        id
      }
    }
    warehouseLocation {
      id
      barcode
      locationCode
      itemCode
      type
    }
    reports {
      id
      damageType
      createdAt
      notes
      user {
        id
        fullName
      }
    }
    productVariant {
      id
      sku
      internalSize {
        id
        display
      }
      retailPrice

      product {
        id
        name
        publishedAt
        category {
          id
          name
        }
        createdAt
        brand {
          id
          name
        }
        architecture
        materialCategory {
          id
          slug
        }
        photographyStatus
        status
      }
    }
  }
`

export default {
  [GET_LIST]: PhysicalProductFragment,
  [GET_ONE]: GetOneFragment,
}
