import gql from "graphql-tag"
import { GET_LIST, GET_ONE } from "react-admin"

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
      shippingAddress {
        id
        city
        state
      }
    }
    bagItems {
      id
    }
    plan
    status
  }
`

const CustomerDetails = gql`
  fragment customer on Customer {
    id
    plan
    status
    user {
      id
      email
      firstName
      lastName
      createdAt
    }
    reservations {
      id
      reservationNumber
      shipped
      status
      shippedAt
      receivedAt
    }
    billingInfo {
      id
      brand
      last_digits
      expiration_month
      expiration_year
      name
      street1
      city
      state
      postal_code
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
        name
        address1
        city
        state
        zipCode
      }
    }
  }
`

export default {
  [GET_LIST]: CustomerFragment,
  [GET_ONE]: CustomerDetails,
}
