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
      barcode
      locationCode
      type
    }
    productVariant {
      sku
      internalSize {
        display
      }
      retailPrice

      product {
        name
        publishedAt
        category {
          name
        }
        createdAt
        brand {
          name
        }
        architecture
        materialCategory {
          slug
        }
        season
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
