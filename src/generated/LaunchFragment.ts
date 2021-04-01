/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: LaunchFragment
// ====================================================

export interface LaunchFragment_brand {
  __typename: "Brand"
  id: string
  name: string
}

export interface LaunchFragment_collection {
  __typename: "Collection"
  id: string
  title: string | null
}

export interface LaunchFragment {
  __typename: "Launch"
  id: string
  launchAt: any
  brand: LaunchFragment_brand | null
  collection: LaunchFragment_collection | null
}
