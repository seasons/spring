/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReservationStatus } from "./globalTypes"

// ====================================================
// GraphQL query operation: GetReservationsForTrackingNumber
// ====================================================

export interface GetReservationsForTrackingNumber_reservations {
  __typename: "Reservation"
  id: string
  status: ReservationStatus
}

export interface GetReservationsForTrackingNumber {
  reservations: (GetReservationsForTrackingNumber_reservations | null)[]
}

export interface GetReservationsForTrackingNumberVariables {
  trackingNumber: string
}
