/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReservationStatus } from "./globalTypes"

// ====================================================
// GraphQL mutation operation: MarkReservationPicked
// ====================================================

export interface MarkReservationPicked_updateReservation {
  __typename: "Reservation"
  id: string
  status: ReservationStatus
}

export interface MarkReservationPicked {
  updateReservation: MarkReservationPicked_updateReservation | null
}

export interface MarkReservationPickedVariables {
  reservationNumber: number
}
