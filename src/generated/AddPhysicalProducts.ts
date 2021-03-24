/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddPhysicalProducts
// ====================================================

export interface AddPhysicalProducts_addPhysicalProductsToVariant {
  __typename: "ProductVariant"
  id: string
}

export interface AddPhysicalProducts {
  addPhysicalProductsToVariant: AddPhysicalProducts_addPhysicalProductsToVariant[] | null
}

export interface AddPhysicalProductsVariables {
  variantID: string
  count?: number | null
}
