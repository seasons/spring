import { GET_ONE, GET_LIST } from "@seasons/react-admin"
import gql from "graphql-tag"

const CollectionFragment = gql`
  fragment CollectionFragment on Collection {
    id
    slug
    images
    title
    subTitle
    descriptions
    published
    products {
      id
      name
      brand {
        name
      }
      images {
        id
        url
      }
    }
    createdAt
    updatedAt
  }
`

export const COLLECTION_EDIT_QUERY = gql`
  query CollectionEditQuery($input: CollectionWhereUniqueInput!) {
    collection(where: $input) {
      ...CollectionFragment
    }
  }
  ${CollectionFragment}
`

export default {
  [GET_LIST]: CollectionFragment,
  [GET_ONE]: CollectionFragment,
}
