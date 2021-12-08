/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReservationStatus } from "./globalTypes"

// ====================================================
// GraphQL mutation operation: EarlyReturn
// ====================================================

export interface EarlyReturn_updateReservation {
  __typename: "Reservation"
  id: string
  status: ReservationStatus
}

export interface EarlyReturn {
  updateReservation: EarlyReturn_updateReservation | null
}

export interface EarlyReturnVariables {
  reservationID?: string | null
  physicalProductIDs?: (string | null)[] | null
}
