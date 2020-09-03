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
      roles
      createdAt
      pushNotification {
        id
        history {
          id
          title
          body
          route
          screen
          uri
          sentAt
          interest
        }
      }
    }
    membership {
      id
      pauseRequests(orderBy: createdAt_DESC) {
        id
        resumeDate
        pauseDate
      }
    }
    invoices {
      id
      subscriptionId
      recurring
      status
      closingDate
      dueDate
      amount
      creditNotes {
        id
        reasonCode
        date
        total
        status
      }
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
      street2
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
      topSizes
      waistSizes
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
        address2
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
