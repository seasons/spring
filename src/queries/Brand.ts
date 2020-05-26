import { GET_LIST } from "@seasons/react-admin"
import gql from "graphql-tag"

export default {
  [GET_LIST]: gql`
    fragment brand on Brand {
      id
      name
      tier
      brandCode
      createdAt
      updatedAt
    }
  `,
}
