import { GET_ONE, GET_LIST } from "@seasons/react-admin"
import gql from "graphql-tag"

const UserFragment = gql`
  fragment user on User {
    id
    auth0Id
    email
    firstName
    lastName
    roles
    createdAt
    updatedAt
  }
`

export default {
  [GET_LIST]: UserFragment,
  [GET_ONE]: UserFragment,
  //   [CREATE]: ReservationFragment,
}
