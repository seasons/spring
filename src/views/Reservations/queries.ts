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
            physicalProduct {
              id
              productVariant {
                id
                product {
                  id
                  images {
                    id
                    url
                  }
                }
              }
            }
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
    reservationProcessingStats {
      currentNumQueuedItems
      currentNumQueuedReservations
      currentNumDeliveredToBusinessItems
      day
      updatedAt
    }
  }
  ${InboundOutboundFragment_reservationPhysicalProductConnection}
`

export const GET_OUTBOUND_RESERVATIONS = gql`
  query OutboundReservations($take: Int!, $skip: Int!) {
    outboundReservations(take: $take, skip: $skip) {
      ...InboundOutboundFragment_reservationPhysicalProductConnection
    }
    reservationProcessingStats {
      currentNumQueuedItems
      currentNumQueuedReservations
      currentNumDeliveredToBusinessItems
      day
      updatedAt
    }
  }
  ${InboundOutboundFragment_reservationPhysicalProductConnection}
`
