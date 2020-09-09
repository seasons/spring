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
