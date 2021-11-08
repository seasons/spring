import { GET_ONE, GET_LIST } from "@seasons/react-admin"
import gql from "graphql-tag"

const CollectionFragment = gql`
  fragment CollectionFragment on Collection {
    id
    slug
    images {
      id
      url
    }
    title
    displayTextOverlay
    textOverlayColor
    subTitle
    descriptions
    published
    placements
    featured
    products {
      id
      name
      brand {
        id
        name
      }
      images {
        id
      }
    }
    createdAt
    updatedAt
  }
`

export const CollectionProductFragment = gql`
  fragment CollectionProductFragment on Product {
    id
    name
    images(size: Thumb) {
      id
      url
    }
    brand {
      id
      name
    }
  }
`

export const COLLECTION_PRODUCTS_QUERY = gql`
  query CollectionCreateQuery($productIDs: [ID!]) {
    products(where: { id_in: $productIDs }) {
      ...CollectionProductFragment
    }
  }
  ${CollectionProductFragment}
`

export default {
  [GET_LIST]: CollectionFragment,
  [GET_ONE]: CollectionFragment,
}
