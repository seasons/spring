/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PhysicalProductStatusesQuery
// ====================================================

export interface PhysicalProductStatusesQuery_inventoryStatuses_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface PhysicalProductStatusesQuery_inventoryStatuses {
  __typename: "__Type"
  enumValues: PhysicalProductStatusesQuery_inventoryStatuses_enumValues[] | null
}

export interface PhysicalProductStatusesQuery_physicalProductStatuses_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface PhysicalProductStatusesQuery_physicalProductStatuses {
  __typename: "__Type"
  enumValues: PhysicalProductStatusesQuery_physicalProductStatuses_enumValues[] | null
}

export interface PhysicalProductStatusesQuery {
  inventoryStatuses: PhysicalProductStatusesQuery_inventoryStatuses | null
  physicalProductStatuses: PhysicalProductStatusesQuery_physicalProductStatuses | null
}
