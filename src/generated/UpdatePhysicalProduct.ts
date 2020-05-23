/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InventoryStatus, PhysicalProductStatus } from "./globalTypes"

// ====================================================
// GraphQL fragment: UpdatePhysicalProduct
// ====================================================

export interface UpdatePhysicalProduct_productVariant {
  __typename: "ProductVariant"
  id: string
}

export interface UpdatePhysicalProduct {
  __typename: "PhysicalProduct"
  id: string
  dateOrdered: any | null
  dateReceived: any | null
  inventoryStatus: InventoryStatus
  productStatus: PhysicalProductStatus
  seasonsUID: string
  unitCost: number | null
  productVariant: UpdatePhysicalProduct_productVariant
}
