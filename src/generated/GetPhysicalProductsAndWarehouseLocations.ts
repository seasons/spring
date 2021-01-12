/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WarehouseLocationType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetPhysicalProductsAndWarehouseLocations
// ====================================================

export interface GetPhysicalProductsAndWarehouseLocations_physicalProducts_warehouseLocation {
  __typename: "WarehouseLocation";
  id: string;
  barcode: string;
}

export interface GetPhysicalProductsAndWarehouseLocations_physicalProducts {
  __typename: "PhysicalProduct";
  id: string;
  seasonsUID: string;
  barcode: string;
  warehouseLocation: GetPhysicalProductsAndWarehouseLocations_physicalProducts_warehouseLocation | null;
}

export interface GetPhysicalProductsAndWarehouseLocations_warehouseLocations {
  __typename: "WarehouseLocation";
  id: string;
  barcode: string;
  locationCode: string;
  itemCode: string;
  type: WarehouseLocationType;
}

export interface GetPhysicalProductsAndWarehouseLocations {
  physicalProducts: (GetPhysicalProductsAndWarehouseLocations_physicalProducts | null)[];
  warehouseLocations: (GetPhysicalProductsAndWarehouseLocations_warehouseLocations | null)[];
}
