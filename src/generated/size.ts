/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProductType } from "./globalTypes"

// ====================================================
// GraphQL fragment: size
// ====================================================

export interface size_top {
  __typename: "TopSize"
  id: string
}

export interface size_bottom {
  __typename: "BottomSize"
  id: string
}

export interface size {
  __typename: "Size"
  id: string
  slug: string
  productType: ProductType | null
  top: size_top | null
  bottom: size_bottom | null
  display: string
}
