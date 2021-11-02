/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryWhereUniqueInput } from "./globalTypes"

// ====================================================
// GraphQL query operation: CategoryEditQuery
// ====================================================

export interface CategoryEditQuery_category {
  __typename: "Category"
  id: string
  slug: string
  recoupment: number | null
  description: string | null
  dryCleaningFee: number | null
  singularName: string | null
  name: string
  visible: boolean
}

export interface CategoryEditQuery {
  category: CategoryEditQuery_category | null
}

export interface CategoryEditQueryVariables {
  input: CategoryWhereUniqueInput
}
