import { GET_LIST, GET_ONE } from "@seasons/react-admin"
import gql from "graphql-tag"

const CustomerGetListFragment_Customer = gql`
  fragment CustomerGetListFragment_Customer on Customer {
    id
    plan
    status
    membership {
      id
      plan {
        id
        planID
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

const CustomerGetOneFragment_Customer = gql`
  fragment CustomerGetOneFragment_Customer on Customer {
    id
    plan
    status
    iOSAppStatus
    bagSections {
      id
      status
      title
      deliveryTrackingUrl
      bagItems {
        id
        saved
        status
        isSwappable
        physicalProduct {
          id
          barcode
          seasonsUID
          price {
            id
            buyUsedPrice
            buyUsedEnabled
          }
          warehouseLocation {
            id
            type
            barcode
            locationCode
            itemCode
          }
        }
        reservationPhysicalProduct {
          id
          status
          isOnHold
          lostInPhase
          reservation {
            id
            pickupDate
            pickupWindow {
              display
            }
          }
          shippingMethod {
            id
            code
          }
          potentialInboundPackage {
            id
            direction
            shippingLabel {
              id
              trackingNumber
              trackingURL
              image
            }
          }
          outboundPackage {
            id
            direction
            shippingLabel {
              id
              trackingNumber
              trackingURL
              image
            }
          }
        }

        productVariant {
          id
          sku
          displayShort
          price {
            id
            buyNewPrice
            buyNewEnabled
          }
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
        chargebee
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
      creditBalance
      creditUpdateHistory {
        id
        amount
        reason
        balance
        createdAt
        adminUser {
          firstName
          lastName
        }
      }
      plan {
        id
        itemCount
        name
      }
      subscription {
        id
        planPrice
      }
      subscriptionId
      currentRentalInvoice {
        id
        billingStartAt
        billingEndAt
        createdAt
        updatedAt
      }
      pauseRequests(orderBy: createdAt_DESC) {
        id
        resumeDate
        pauseDate
        reason {
          id
          reason
        }
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
    reservations(orderBy: createdAt_DESC) {
      id
      reservationNumber
      shipped
      status
      shippedAt
      receivedAt
      createdAt
      lineItems {
        id
        name
        price
        recordType
      }
      sentPackage {
        id
        items {
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
      newProducts {
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
      pantLength
      shoeSize
      discoveryReference
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
  [GET_LIST]: CustomerGetListFragment_Customer,
  [GET_ONE]: CustomerGetOneFragment_Customer,
}
