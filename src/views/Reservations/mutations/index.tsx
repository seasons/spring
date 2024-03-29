import gql from "graphql-tag"

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

export const PICK_ITEMS = gql`
  mutation PickItems($ids: [ID!]!) {
    pickItems(bagItemIds: $ids) {
      id
    }
  }
`

export const PACK_ITEMS = gql`
  mutation PackItems($ids: [ID!]!) {
    packItems(bagItemIds: $ids) {
      id
    }
  }
`

export const MARK_AS_CANCELLED = gql`
  mutation MarkAsCancelled($bagItemIds: [ID]!) {
    markAsCancelled(bagItemIds: $bagItemIds)
  }
`
