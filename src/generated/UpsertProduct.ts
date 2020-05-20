/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpsertProductInput } from "./globalTypes"

// ====================================================
// GraphQL mutation operation: UpsertProduct
// ====================================================

export interface UpsertProduct_upsertProduct_variants_physicalProducts {
  __typename: "PhysicalProduct"
  id: string
  seasonsUID: string
}

export interface UpsertProduct_upsertProduct_variants {
  __typename: "ProductVariant"
  id: string
  sku: string | null
  physicalProducts: UpsertProduct_upsertProduct_variants_physicalProducts[] | null
}

export interface UpsertProduct_upsertProduct {
  __typename: "Product"
  id: string
  name: string
  variants: UpsertProduct_upsertProduct_variants[] | null
}

export interface UpsertProduct {
  upsertProduct: UpsertProduct_upsertProduct | null
}

export interface UpsertProductVariables {
  input: UpsertProductInput
}
