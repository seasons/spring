import gql from "graphql-tag"

const InboundOutboundFragment_reservationPhysicalProductConnection = gql`
  fragment InboundOutboundFragment_reservationPhysicalProductConnection on ReservationPhysicalProductConnection {
    totalCount
    edges {
      node {
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
    }
  }
`

export const GET_INBOUND_RESERVATIONS = gql`
  query InboundReservations($take: Int!, $skip: Int!) {
    inboundReservations(take: $take, skip: $skip) {
      ...InboundOutboundFragment_reservationPhysicalProductConnection
    }
  }
  ${InboundOutboundFragment_reservationPhysicalProductConnection}
`

export const GET_OUTBOUND_RESERVATIONS = gql`
  query OutboundReservations($take: Int!, $skip: Int!) {
    outboundReservations(take: $take, skip: $skip) {
      ...InboundOutboundFragment_reservationPhysicalProductConnection
    }
  }
  ${InboundOutboundFragment_reservationPhysicalProductConnection}
`
