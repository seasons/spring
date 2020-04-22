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
        firstName
        lastName
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
      productVariant {
        product {
          images
        }
      }
    }
    reservationNumber
    shipped
    status
    sentPackage {
      weight
    }
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
