/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PackItems
// ====================================================

export interface PackItems_packItems {
  __typename: "ReservationPhysicalProduct"
  id: string
}

export interface PackItems {
  packItems: PackItems_packItems[] | null
}

export interface PackItemsVariables {
  ids: string[]
}
