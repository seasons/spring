/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WarehouseLocationType } from "./globalTypes"

// ====================================================
// GraphQL query operation: GetAllWarehouseLocations
// ====================================================

export interface GetAllWarehouseLocations_warehouseLocations {
  __typename: "WarehouseLocation"
  id: string
  barcode: string
  locationCode: string
  itemCode: string
  type: WarehouseLocationType
}

export interface GetAllWarehouseLocations {
  warehouseLocations: (GetAllWarehouseLocations_warehouseLocations | null)[]
}
