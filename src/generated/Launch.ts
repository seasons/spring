/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Launch
// ====================================================

export interface Launch_brand {
  __typename: "Brand"
  id: string
  name: string
}

export interface Launch_collection {
  __typename: "Collection"
  id: string
  title: string | null
}

export interface Launch {
  __typename: "Launch"
  id: string
  brand: Launch_brand | null
  collection: Launch_collection | null
  launchAt: any
}
