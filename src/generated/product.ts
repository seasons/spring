/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: product
// ====================================================

export interface product_images {
  __typename: "Image"
  url: string | null
}

export interface product_brand {
  __typename: "Brand"
  id: string
  name: string
}

export interface product_category {
  __typename: "Category"
  id: string
  name: string
}

export interface product {
  __typename: "Product"
  id: string
  name: string
  description: string | null
  images: product_images[] | null
  retailPrice: number | null
  createdAt: any
  updatedAt: any
  brand: product_brand
  category: product_category
}
