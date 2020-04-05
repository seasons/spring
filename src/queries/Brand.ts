import { GET_LIST } from "react-admin"
import gql from "graphql-tag"

export default {
  [GET_LIST]: gql`
    fragment brand on Brand {
      id
      name
      brandCode
      createdAt
      updatedAt
    }
  `,
}
