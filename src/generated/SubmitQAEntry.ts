/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PhysicalProductDamageType } from "./globalTypes"

// ====================================================
// GraphQL mutation operation: SubmitQAEntry
// ====================================================

export interface SubmitQAEntry_createPhysicalProductQualityReport {
  __typename: "PhysicalProductQualityReport"
  id: string
}

export interface SubmitQAEntry {
  createPhysicalProductQualityReport: SubmitQAEntry_createPhysicalProductQualityReport
}

export interface SubmitQAEntryVariables {
  notes: string
  type: PhysicalProductDamageType
  physicalProductID: string
  userID: string
}
