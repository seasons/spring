/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollectionProductFragment
// ====================================================

export interface CollectionProductFragment_images {
  __typename: "Image"
  id: string
  url: string | null
}

export interface CollectionProductFragment_brand {
  __typename: "Brand"
  id: string
  name: string
}

export interface CollectionProductFragment {
  __typename: "Product"
  id: string
  name: string
  images: CollectionProductFragment_images[]
  brand: CollectionProductFragment_brand
}
