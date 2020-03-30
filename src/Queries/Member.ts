import { GET_LIST } from "react-admin"
import gql from "graphql-tag"

export default {
  [GET_LIST]: gql`
    fragment user on User {
      id
      email
      firstName
      lastName
    }
  `,
}
