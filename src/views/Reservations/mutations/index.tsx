import gql from "graphql-tag"

export const PROCESS_RESERVATION = gql`
  mutation ProcessReservationMutation($data: ReservationProcessReturnInput!) {
    processReservation(data: $data) {
      id
    }
  }
`

export const MARK_RESERVATION_PICKED = gql`
  mutation UpdateReservationMutation($reservationNumber: Int!) {
    updateReservation(data: { status: Packed }, where: { reservationNumber: $reservationNumber }) {
      id
      status
    }
  }
`
