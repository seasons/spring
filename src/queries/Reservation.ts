import { GET_ONE, GET_LIST } from "@seasons/react-admin"
import gql from "graphql-tag"

export default {
  [GET_LIST]: gql`
    fragment GetReservationList on Reservation {
      id
      customer {
        id
        user {
          id
          firstName
          lastName
          email
        }
      }
      images(size: Thumb) {
        url
      }
      phase
      reservationNumber
      shipped
      status
      shippedAt
      statusUpdatedAt
      returnAt
      createdAt
    }
  `,
  [GET_ONE]: gql`
    fragment GetReservation on Reservation {
      id
      user {
        id
        email
        firstName
        lastName
      }
      customer {
        id
        user {
          id
          firstName
          lastName
          email
        }
        detail {
          id
          shippingAddress {
            id
            name
            address1
            address2
            city
            state
          }
        }
      }
      sentPackage {
        id
        shippingLabel {
          id
          image
          trackingNumber
          trackingURL
        }
        weight
      }
      returnedPackage {
        id
        shippingLabel {
          id
          image
          trackingNumber
          trackingURL
        }
        weight
      }
      packageEvents(orderBy: createdAt_DESC, first: 1) {
        id
        data
        status
        createdAt
        updatedAt
      }
      adminLogs {
        action
        triggeredAt
        changedFields
        rowData
        activeAdminUser {
          id
          fullName
        }
      }
      lastLocation {
        id
        slug
        address1
        address2
        city
        state
      }
      products {
        id
        seasonsUID
        inventoryStatus
        productStatus
        barcode
        location {
          id
          slug
        }
        warehouseLocation {
          id
          barcode
          locationCode
          itemCode
          type
        }
        productVariant {
          id
          product {
            id
            name
            brand {
              id
              name
            }
            description
            color {
              id
              hexCode
              name
            }
            secondaryColor {
              id
              hexCode
              name
            }
            status
            type
            images {
              id
              url
            }
          }
        }
      }
      images(size: Large) {
        url
      }
      reservationNumber
      shipped
      status
      sentPackage {
        id
        weight
      }
      shippedAt
      receivedAt
      returnAt
      statusUpdatedAt
      createdAt
      updatedAt
    }
  `,
}
