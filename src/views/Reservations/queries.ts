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
  ${InboundOutboundFragment_reservationPhysicalProduct}
`
