import { CREATE, GET_ONE, GET_LIST } from "@seasons/react-admin"
import gql from "graphql-tag"

export const ProductFragment = gql`
  fragment product on Product {
    id
    name
    description
    photographyStatus
    images(size: Small, options: { retina: true }) {
      url
    }
    retailPrice
    createdAt
    updatedAt
    brand {
      id
      name
    }
    category {
      id
      name
    }
    createdAt
    updatedAt
  }
`

export default {
  [GET_LIST]: gql`
    fragment product on Product {
      id
      name
      description
      photographyStatus
      images(size: Small, options: { retina: false }) {
        url
      }
      retailPrice
      createdAt
      updatedAt
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
      status
      createdAt
      updatedAt
    }
  `,
  [GET_ONE]: ProductFragment,
  [CREATE]: ProductFragment,
}
