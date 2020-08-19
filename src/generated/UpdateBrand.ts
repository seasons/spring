/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BrandWhereUniqueInput, BrandCreateInput } from "./globalTypes"

// ====================================================
// GraphQL mutation operation: UpdateBrand
// ====================================================

export interface UpdateBrand_updateBrand {
  __typename: "Brand"
  id: string
  name: string
  slug: string
  brandCode: string
}

export interface UpdateBrand {
  updateBrand: UpdateBrand_updateBrand | null
}

export interface UpdateBrandVariables {
  where: BrandWhereUniqueInput
  data: BrandCreateInput
}
