/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllBrands
// ====================================================

export interface getAllBrands_brands {
  __typename: "Brand"
  id: string
  name: string
  slug: string
}

export interface getAllBrands {
  brands: (getAllBrands_brands | null)[]
}
