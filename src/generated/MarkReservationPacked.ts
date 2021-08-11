/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReservationStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MarkReservationPacked
// ====================================================

export interface MarkReservationPacked_updateReservation {
  __typename: "Reservation";
  id: string;
  status: ReservationStatus;
}

export interface MarkReservationPacked {
  updateReservation: MarkReservationPacked_updateReservation | null;
}

export interface MarkReservationPackedVariables {
  reservationNumber: number;
}
