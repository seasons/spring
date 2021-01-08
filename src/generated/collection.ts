/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: collection
// ====================================================

export interface collection_products {
  __typename: "Product"
  id: string
}

export interface collection {
  __typename: "Collection"
  id: string
  slug: string
  images: any | null
  title: string | null
  subTitle: string | null
  descriptions: string[]
  published: boolean
  products: collection_products[] | null
  createdAt: any
  updatedAt: any | null
}
