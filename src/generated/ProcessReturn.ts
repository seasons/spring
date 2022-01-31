/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductStateInput, ReservationDropOffAgent } from "./globalTypes"

// ====================================================
// GraphQL mutation operation: ProcessReturn
// ====================================================

export interface ProcessReturn {
  processReturn: boolean | null
}

export interface ProcessReturnVariables {
  trackingNumber?: string | null
  productStates: ProductStateInput[]
  droppedOffBy: ReservationDropOffAgent
  customerId?: string | null
}
