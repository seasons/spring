/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReservationStatus } from "./globalTypes"

// ====================================================
// GraphQL query operation: GetReservationsForProduct
// ====================================================

export interface GetReservationsForProduct_reservations {
  __typename: "Reservation"
  id: string
  status: ReservationStatus
}

export interface GetReservationsForProduct {
  reservations: (GetReservationsForProduct_reservations | null)[]
}

export interface GetReservationsForProductVariables {
  sequenceNumber: number
}
