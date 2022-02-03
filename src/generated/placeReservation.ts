/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: placeReservation
// ====================================================

export interface placeReservation_reserveItemsForCustomer {
  __typename: "Reservation"
  id: string
  reservationNumber: number
}

export interface placeReservation {
  reserveItemsForCustomer: placeReservation_reserveItemsForCustomer | null
}

export interface placeReservationVariables {
  customerID: string
}
