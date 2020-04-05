import { GET_LIST } from "react-admin"
import gql from "graphql-tag"

export default {
  [GET_LIST]: gql`
    fragment size on Size {
      id
      slug
      productType
      top {
        id
      }
      bottom {
        id
      }
      display
    }
  `,
}
