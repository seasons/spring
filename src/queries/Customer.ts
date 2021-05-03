import { GET_LIST, GET_ONE } from "@seasons/react-admin"
import gql from "graphql-tag"

const CustomerFragment = gql`
  fragment customer on Customer {
    id
    plan
    status
    membership {
      id
      plan {
        id
        planID
      }
      pauseRequests(orderBy: createdAt_DESC) {
        id
        resumeDate
      }
    }
    user {
      id
      email
      firstName
      lastName
      links {
        sendgrid
        mixpanel
        intercom
      }
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
    admissions {
      id
      inServiceableZipcode
      admissable
      inAdmissableReason
      authorizationsCount
    }
  }
`

const CustomerDetails = gql`
  fragment customer on Customer {
    id
    plan
    status
    bagItems {
      id
      saved
      status
      productVariant {
        id
        sku
        internalSize {
          id
          display
        }
        product {
          id
          slug
          name
          images(size: Thumb) {
            id
            url
          }
          brand {
            id
            name
          }
        }
      }
    }
    user {
      id
      email
      firstName
      lastName
      roles
      createdAt
      links {
        sendgrid
        mixpanel
        intercom
      }
      emails {
        id
        emailId
        createdAt
      }
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
    admissions {
      id
      inServiceableZipcode
      admissable
      inAdmissableReason
      authorizationsCount
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
      createdAt
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
    utm {
      id
      source
      medium
      campaign
      term
      content
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
      discoveryReference
      averagePantLength
      preferredPronouns
      profession
      partyFrequency
      travelFrequency
      shoppingFrequency
      averageSpend
      style
      commuteStyle
      instagramHandle
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
