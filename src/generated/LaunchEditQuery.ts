/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LaunchWhereUniqueInput } from "./globalTypes"

// ====================================================
// GraphQL query operation: LaunchEditQuery
// ====================================================

export interface LaunchEditQuery_launch_brand {
  __typename: "Brand"
  id: string
  name: string
}

export interface LaunchEditQuery_launch_collection {
  __typename: "Collection"
  id: string
  title: string | null
}

export interface LaunchEditQuery_launch {
  __typename: "Launch"
  id: string
  launchAt: any
  brand: LaunchEditQuery_launch_brand | null
  collection: LaunchEditQuery_launch_collection | null
}

export interface LaunchEditQuery_brands {
  __typename: "Brand"
  id: string
  name: string
}

export interface LaunchEditQuery_collections {
  __typename: "Collection"
  id: string
  title: string | null
}

export interface LaunchEditQuery {
  launch: LaunchEditQuery_launch | null
  brands: (LaunchEditQuery_brands | null)[]
  collections: (LaunchEditQuery_collections | null)[]
}

export interface LaunchEditQueryVariables {
  input: LaunchWhereUniqueInput
}
