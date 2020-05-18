import gql from "graphql-tag"

export const PROCESS_RESERVATION = gql`
  mutation ProcessReservationMutation($data: ReservationProcessReturnInput!) {
    processReservation(data: $data) {
      id
    }
  }
`
