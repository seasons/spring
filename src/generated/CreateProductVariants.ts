/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateVariantInput } from "./globalTypes"

// ====================================================
// GraphQL mutation operation: CreateProductVariants
// ====================================================

export interface CreateProductVariants_createProductVariants {
  __typename: "ProductVariant"
  id: string
  sku: string | null
  total: number
  weight: number | null
}

export interface CreateProductVariants {
  createProductVariants: CreateProductVariants_createProductVariants[] | null
}

export interface CreateProductVariantsVariables {
  productID: string
  inputs: CreateVariantInput[]
}
