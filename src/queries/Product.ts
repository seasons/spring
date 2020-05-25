import { CREATE, GET_ONE, GET_LIST } from "@seasons/react-admin"
import gql from "graphql-tag"

export const ProductFragment = gql`
  fragment product on Product {
    id
    name
    description
    images(size: Small) {
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
  }
`

export default {
  [GET_LIST]: ProductFragment,
  [GET_ONE]: ProductFragment,
  [CREATE]: ProductFragment,
}
