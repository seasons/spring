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
      images(size: Small) {
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
      }
      returnedPackage {
        id
      }
      location {
        id
      }
      products {
        id
        seasonsUID
        productVariant {
          product {
            id
            name
            brand {
              name
            }
            description
            status
            type
            resizedImages(size: Large) {
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
