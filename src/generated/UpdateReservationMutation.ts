/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateReservationMutation
// ====================================================

export interface UpdateReservationMutation_updateReservation {
  __typename: "Reservation"
  id: string
  status: string
}

export interface UpdateReservationMutation {
  updateReservation: UpdateReservationMutation_updateReservation | null
}

export interface UpdateReservationMutationVariables {
  reservationNumber: number
}
