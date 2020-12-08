import { GET_ONE, GET_LIST } from "@seasons/react-admin"
import gql from "graphql-tag"

export const PhysicalProductFragment = gql`
  fragment PhysicalProduct on PhysicalProduct {
    id
    seasonsUID
    inventoryStatus
    sequenceNumber
    unitCost
    dateOrdered
    dateReceived
    productStatus
    createdAt
    barcoded
    barcode
    sellableNew
    sellableNewPrice
    sellableUsed
    sellableUsedPrice
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
  [GET_ONE]: PhysicalProductFragment,
}
