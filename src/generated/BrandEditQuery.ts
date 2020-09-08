/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BrandWhereUniqueInput, BrandTier } from "./globalTypes"

// ====================================================
// GraphQL query operation: BrandEditQuery
// ====================================================

export interface BrandEditQuery_brand_images {
  __typename: "Image"
  id: string
  url: string | null
}

export interface BrandEditQuery_brand {
  __typename: "Brand"
  id: string
  name: string
  description: string | null
  brandCode: string
  since: any | null
  images: BrandEditQuery_brand_images[] | null
  tier: BrandTier
  websiteUrl: string | null
}

export interface BrandEditQuery {
  brand: BrandEditQuery_brand | null
}

export interface BrandEditQueryVariables {
  input: BrandWhereUniqueInput
}
