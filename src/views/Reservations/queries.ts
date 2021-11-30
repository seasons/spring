import gql from "graphql-tag"

const InboundOutboundFragment_reservationPhysicalProduct = gql`
  fragment InboundOutboundFragment_reservationPhysicalProduct on ReservationPhysicalProduct {
    id
    customer {
      id
      reservations {
        id
      }
      detail {
        id
        shippingAddress {
          id
          city
          state
        }
      }
      user {
        id
        firstName
        lastName
      }
      reservationPhysicalProducts {
        id
        status
        createdAt
      }
    }
  }
`

export const GET_RESERVATIONS_FOR_PRODUCT_QUERY = gql`
  query GetReservationsForProduct($sequenceNumber: Int!) {
    reservations(where: { products_some: { sequenceNumber: $sequenceNumber } }, orderBy: createdAt_DESC) {
      id
      status
    }
  }
`

export const GET_INBOUND_RESERVATIONS = gql`
  query InboundReservations {
    inboundReservations {
      ...InboundOutboundFragment_reservationPhysicalProduct
    }
  }
  ${InboundOutboundFragment_reservationPhysicalProduct}
`

export const GET_OUTBOUND_RESERVATIONS = gql`
  query OutboundReservations {
    outboundReservations {
      ...InboundOutboundFragment_reservationPhysicalProduct
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
  ${InboundOutboundFragment_reservationPhysicalProduct}
`
