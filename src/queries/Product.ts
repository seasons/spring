import { CREATE, GET_ONE, GET_LIST } from "@seasons/react-admin"
import gql from "graphql-tag"

export const ProductFragment = gql`
  fragment product on Product {
    id
    slug
    name
    description
    photographyStatus
    productFit
    createdAt
    updatedAt
    publishedAt
    retailPrice
    type
    isRentable
    images(size: Small, options: { retina: true }) {
      url
    }
    brand {
      id
      name
    }
    category {
      id
      name
      measurementType
    }
  }
`

export default {
  [GET_LIST]: gql`
    fragment product on Product {
      id
      name
      slug
      description
      photographyStatus
      isRentable
      images(size: XSmall, options: { retina: false }) {
        url
      }
      retailPrice
      createdAt
      updatedAt
      publishedAt
      brand {
        id
        name
      }
      category {
        id
        name
      }
      variants {
        id
        sku
        internalSize {
          id
          display
          productType
        }
        physicalProducts {
          id
          seasonsUID
          barcode
          barcoded
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
      status
      createdAt
      updatedAt
    }
  `,
  [GET_ONE]: ProductFragment,
  [CREATE]: ProductFragment,
}
