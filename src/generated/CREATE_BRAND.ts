/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BrandCreateInput } from "./globalTypes"

// ====================================================
// GraphQL mutation operation: CREATE_BRAND
// ====================================================

export interface CREATE_BRAND_createBrand {
  __typename: "Brand"
  id: string
  name: string
  slug: string
  brandCode: string
}

export interface CREATE_BRAND {
  createBrand: CREATE_BRAND_createBrand | null
}

export interface CREATE_BRANDVariables {
  input: BrandCreateInput
}
