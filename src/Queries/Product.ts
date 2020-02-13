import { CREATE, GET_ONE, GET_LIST } from "react-admin"
import gql from "graphql-tag"

const ProductFragment = gql`
  fragment product on Product {
    id
    name
    description
    images
    retailPrice
    tags
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
