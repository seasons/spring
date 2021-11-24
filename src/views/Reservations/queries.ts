import gql from "graphql-tag"

export const GET_RESERVATIONS_FOR_PRODUCT_QUERY = gql`
  query GetReservationsForProduct($sequenceNumber: Int!) {
    reservations(where: { products_some: { sequenceNumber: $sequenceNumber } }, orderBy: createdAt_DESC) {
      id
      status
    }
  }
`

export const GET_RESERVATIONS_FOR_TRACKING_NUMBER_QUERY = gql`
  query GetReservationsForTrackingNumber($trackingNumber: String!) {
    reservations(
      where: {
        OR: [
          { sentPackage: { shippingLabel: { trackingNumber: $trackingNumber } } }
          { returnPackages_some: { shippingLabel: { trackingNumber: $trackingNumber } } }
        ]
      }
      orderBy: createdAt_DESC
    ) {
      id
      status
    }
  }
`
