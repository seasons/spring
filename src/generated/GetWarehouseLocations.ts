/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WarehouseLocationType } from "./globalTypes"

// ====================================================
// GraphQL query operation: GetWarehouseLocations
// ====================================================

export interface GetWarehouseLocations_warehouseLocations {
  __typename: "WarehouseLocation"
  id: string
  barcode: string
  locationCode: string
  itemCode: string
  type: WarehouseLocationType
}

export interface GetWarehouseLocations {
  warehouseLocations: (GetWarehouseLocations_warehouseLocations | null)[]
}
