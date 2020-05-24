import { GET_ONE, GET_LIST } from "react-admin"
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
      reservationNumber
      shipped
      status
      shippedAt
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
          shippingAddress {
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
          image
          trackingNumber
          trackingURL
        }
        weight
      }
      returnedPackage {
        id
        shippingLabel {
          image
          trackingNumber
          trackingURL
        }
        weight
      }
      location {
        id
      }
      products {
        id
        seasonsUID
        inventoryStatus
        productStatus
        barcode
        warehouseLocation {
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
              hexCode
              name
            }
            secondaryColor {
              hexCode
              name
            }
            status
            type
            images {
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
        weight
      }
      shippedAt
      receivedAt
      returnAt
      createdAt
      updatedAt
    }
  `,
}

export const query = {
  [GET_LIST]: gql`
    query GetReservationList {
      reservations {
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
        images(size: Small) {
          url
        }
        reservationNumber
        shipped
        status(display: true)
        shippedAt
        returnAt
        createdAt
      }
    }
  `,
}
