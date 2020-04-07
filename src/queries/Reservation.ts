import { GET_ONE, GET_LIST } from "react-admin"
import gql from "graphql-tag"

const ReservationFragment = gql`
  fragment reservation on Reservation {
    id
    user {
      id
      email
    }
    customer {
      id
      user {
        id
        email
      }
    }
    sentPackage {
      id
    }
    returnedPackage {
      id
    }
    location {
      id
    }
    products {
      id
    }
    reservationNumber
    shipped
    status
    shippedAt
    receivedAt
    createdAt
    updatedAt
  }
`

export default {
  [GET_LIST]: ReservationFragment,
  [GET_ONE]: ReservationFragment,
  //   [CREATE]: ReservationFragment,
}
