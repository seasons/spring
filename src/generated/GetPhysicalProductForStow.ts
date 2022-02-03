/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPhysicalProductForStow
// ====================================================

export interface GetPhysicalProductForStow_physicalProduct_warehouseLocation {
  __typename: "WarehouseLocation"
  id: string
  barcode: string
}

export interface GetPhysicalProductForStow_physicalProduct {
  __typename: "PhysicalProduct"
  id: string
  seasonsUID: string
  warehouseLocation: GetPhysicalProductForStow_physicalProduct_warehouseLocation | null
}

export interface GetPhysicalProductForStow {
  physicalProduct: GetPhysicalProductForStow_physicalProduct | null
}

export interface GetPhysicalProductForStowVariables {
  sequenceNumber: number
}
