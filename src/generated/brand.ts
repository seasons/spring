/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BrandTier } from "./globalTypes"

// ====================================================
// GraphQL fragment: brand
// ====================================================

export interface brand_productsConnection_aggregate {
  __typename: "AggregateProduct"
  count: number
}

export interface brand_productsConnection {
  __typename: "ProductConnection"
  aggregate: brand_productsConnection_aggregate
}

export interface brand {
  __typename: "Brand"
  id: string
  name: string
  tier: BrandTier
  brandCode: string
  published: boolean
  featured: boolean
  productsConnection: brand_productsConnection
  createdAt: any
  updatedAt: any
}
