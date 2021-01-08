import { GET_ONE, GET_LIST } from "@seasons/react-admin"
import gql from "graphql-tag"

const Collection = gql`
  fragment collection on Collection {
    id
    slug
    images
    title
    subTitle
    descriptions
    published
    products {
      id
    }
    createdAt
    updatedAt
  }
`

export default {
  [GET_LIST]: Collection,
  [GET_ONE]: Collection,
}
