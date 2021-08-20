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
