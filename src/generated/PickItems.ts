/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PickItems
// ====================================================

export interface PickItems_pickItems {
  __typename: "ReservationPhysicalProduct"
  id: string
}

export interface PickItems {
  pickItems: PickItems_pickItems[] | null
}

export interface PickItemsVariables {
  ids: string[]
}
