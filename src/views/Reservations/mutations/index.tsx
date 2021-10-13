import gql from "graphql-tag"

export const PROCESS_RESERVATION = gql`
  mutation ProcessReservationMutation($data: ReservationProcessReturnInput!) {
    processReservation(data: $data) {
      id
    }
  }
`

export const MARK_RESERVATION_PICKED = gql`
  mutation MarkReservationPicked($reservationNumber: Int!) {
    updateReservation(data: { status: Picked }, where: { reservationNumber: $reservationNumber }) {
      id
      status
    }
  }
`

export const MARK_RESERVATION_PACKED = gql`
  mutation MarkReservationPacked($reservationNumber: Int!) {
    updateReservation(data: { status: Packed }, where: { reservationNumber: $reservationNumber }) {
      id
      status
    }
  }
`

export const UPDATE_RESERVATION = gql`
  mutation UpdateReservation($reservationNumber: Int!, $status: ReservationStatus!) {
    updateReservation(data: { status: $status }, where: { reservationNumber: $reservationNumber }) {
      id
      status
    }
  }
`
export const EARLY_RETURN = gql`
  mutation EarlyReturn($reservationID: String, $physicalProductIDs: [ID]) {
    earlyReturn(reservationID: $reservationID, physicalProductIDs: $physicalProductIDs) {
      id
    }
  }
`

export const RETURN_MULTI_ITEMS = gql`
  mutation ReturnMultiItems(
    $trackingNumber: String
    $productStates: [ProductStateInput!]!
    $droppedOffBy: ReservationDropOffAgent
  ) {
    returnMultiItems(trackingNumber: $trackingNumber, productStates: $productStates, droppedOffBy: $droppedOffBy)
  }
`
