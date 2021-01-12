/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReservationProcessReturnInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ProcessReservationMutation
// ====================================================

export interface ProcessReservationMutation_processReservation {
  __typename: "ReservationReceipt";
  id: string;
}

export interface ProcessReservationMutation {
  processReservation: ProcessReservationMutation_processReservation | null;
}

export interface ProcessReservationMutationVariables {
  data: ReservationProcessReturnInput;
}
