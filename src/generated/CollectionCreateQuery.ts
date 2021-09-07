/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CollectionCreateQuery
// ====================================================

export interface CollectionCreateQuery_products_images {
  __typename: "Image"
  id: string
  url: string | null
}

export interface CollectionCreateQuery_products_brand {
  __typename: "Brand"
  id: string
  name: string
}

export interface CollectionCreateQuery_products {
  __typename: "Product"
  id: string
  name: string
  images: CollectionCreateQuery_products_images[]
  brand: CollectionCreateQuery_products_brand
}

export interface CollectionCreateQuery {
  products: (CollectionCreateQuery_products | null)[]
}

export interface CollectionCreateQueryVariables {
  productIDs?: string[] | null
}
