/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReservationStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateReservation
// ====================================================

export interface UpdateReservation_updateReservation {
  __typename: "Reservation";
  id: string;
  status: ReservationStatus;
}

export interface UpdateReservation {
  updateReservation: UpdateReservation_updateReservation | null;
}

export interface UpdateReservationVariables {
  reservationNumber: number;
  status: ReservationStatus;
}
