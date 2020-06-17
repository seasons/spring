/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BrandCreateInput } from "./globalTypes"

// ====================================================
// GraphQL mutation operation: CreateBrand
// ====================================================

export interface CreateBrand_createBrand {
  __typename: "Brand"
  id: string
  name: string
  slug: string
  brandCode: string
}

export interface CreateBrand {
  createBrand: CreateBrand_createBrand | null
}

export interface CreateBrandVariables {
  input: BrandCreateInput
}
