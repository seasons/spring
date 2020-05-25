import gql from "graphql-tag"
import { GET_LIST, GET_ONE } from "@seasons/react-admin"

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
    invoices {
      id
      subscriptionId
      recurring
      status
      closingDate
      dueDate
      amount
    }
    reservations {
      id
      reservationNumber
      shipped
      status
      shippedAt
      receivedAt
      products {
        id
        productVariant {
          id
          product {
            id
            images(size: Small) {
              url
            }
          }
        }
      }
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
