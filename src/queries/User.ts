import { GET_ONE, GET_LIST } from "react-admin"
import gql from "graphql-tag"

const UserFragment = gql`
  fragment user on User {
    id
    auth0Id
    email
    firstName
    lastName
    role
    createdAt
    updatedAt
  }
`

export default {
  [GET_LIST]: UserFragment,
  [GET_ONE]: UserFragment,
  //   [CREATE]: ReservationFragment,
}
