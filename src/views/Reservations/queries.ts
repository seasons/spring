import gql from "graphql-tag"

export const GET_RESERVATIONS_FOR_PRODUCT_QUERY = gql`
  query GetReservationsForProduct($id: ID!, $orderBy: ReservationOrderByInput) {
    physicalProduct(where: { id: $id }) {
      reservations(orderBy: $orderBy) {
        id
      }
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
      first: 1
      orderBy: createdAt_DESC
    ) {
      id
    }
  }
`

export const GET_RESERVATIONS_BY_SEQ_NUM = gql`
  query GetReservationsBySeqNum($where: ReservationWhereInput) {
    reservations(where: $where, orderBy: createdAt_DESC, first: 1) {
      id
    }
  }
`
