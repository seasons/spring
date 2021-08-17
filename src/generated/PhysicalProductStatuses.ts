/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PhysicalProductStatuses
// ====================================================

export interface PhysicalProductStatuses_inventoryStatuses_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface PhysicalProductStatuses_inventoryStatuses {
  __typename: "__Type";
  enumValues: PhysicalProductStatuses_inventoryStatuses_enumValues[] | null;
}

export interface PhysicalProductStatuses_physicalProductStatuses_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface PhysicalProductStatuses_physicalProductStatuses {
  __typename: "__Type";
  enumValues: PhysicalProductStatuses_physicalProductStatuses_enumValues[] | null;
}

export interface PhysicalProductStatuses {
  __typename: "Query";
  inventoryStatuses: PhysicalProductStatuses_inventoryStatuses | null;
  physicalProductStatuses: PhysicalProductStatuses_physicalProductStatuses | null;
}
