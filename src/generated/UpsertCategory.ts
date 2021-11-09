/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryWhereUniqueInput, CustomCategoryUpsertInput } from "./globalTypes"

// ====================================================
// GraphQL mutation operation: UpsertCategory
// ====================================================

export interface UpsertCategory_upsertCategory {
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

export interface UpsertCategory {
  upsertCategory: UpsertCategory_upsertCategory | null
}

export interface UpsertCategoryVariables {
  where: CategoryWhereUniqueInput
  data: CustomCategoryUpsertInput
}
