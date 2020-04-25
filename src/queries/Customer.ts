import gql from "graphql-tag"
import { CREATE, GET_LIST, GET_ONE } from "react-admin"

const CustomerFragment = gql`
  fragment customer on Customer {
    id
    user {
      id
      email
      firstName
      lastName
    }
    detail {
      id
      phoneNumber
      birthday
      height
      weight
      bodyType
      averageTopSize
      averageWaistSize
      averagePantLength
      preferredPronouns
      profession
      partyFrequency
      travelFrequency
      shoppingFrequency
      averageSpend
      style
      commuteStyle
      shippingAddress {
        id
        city
        state
      }
      phoneOS
      insureShipment
    }
    bagItems {
      id
    }
    plan
    status
  }
`

const CustomerReservations = gql`
  fragment customer on Customer {
    id
    user {
      id
      email
      firstName
      lastName
    }
    reservations {
      id
      reservationNumber
      shipped
      status
      shippedAt
      receivedAt
    }
  }
`

export default {
  [GET_LIST]: CustomerFragment,
  [GET_ONE]: CustomerReservations,
  [CREATE]: CustomerFragment,
}
