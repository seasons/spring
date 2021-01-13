/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionFragment
// ====================================================

export interface CollectionFragment_images {
  __typename: "Image"
  id: string
  url: string | null
}

export interface CollectionFragment_products_brand {
  __typename: "Brand"
  id: string
  name: string
}

export interface CollectionFragment_products_images {
  __typename: "Image"
  id: string
}

export interface CollectionFragment_products {
  __typename: "Product"
  id: string
  name: string
  brand: CollectionFragment_products_brand
  images: CollectionFragment_products_images[]
}

export interface CollectionFragment {
  __typename: "Collection"
  id: string
  slug: string
  images: CollectionFragment_images[] | null
  title: string | null
  subTitle: string | null
  descriptions: string[]
  published: boolean
  products: CollectionFragment_products[] | null
  createdAt: any
  updatedAt: any | null
}
