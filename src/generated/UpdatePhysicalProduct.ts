/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  InventoryStatus,
  PhysicalProductStatus,
  PhysicalProductOffloadMethod,
  WarehouseLocationType,
  ProductStatus,
} from "./globalTypes"

// ====================================================
// GraphQL fragment: UpdatePhysicalProduct
// ====================================================

export interface UpdatePhysicalProduct_warehouseLocation {
  __typename: "WarehouseLocation"
  id: string
  barcode: string
  type: WarehouseLocationType
  itemCode: string
  locationCode: string
  createdAt: any
  updatedAt: any
}

export interface UpdatePhysicalProduct_productVariant_product {
  __typename: "Product"
  id: string
  status: ProductStatus | null
  name: string
}

export interface UpdatePhysicalProduct_productVariant {
  __typename: "ProductVariant"
  id: string
  sku: string | null
  product: UpdatePhysicalProduct_productVariant_product
}

export interface UpdatePhysicalProduct {
  __typename: "PhysicalProduct"
  id: string
  barcode: string
  barcoded: boolean
  dateOrdered: any | null
  dateReceived: any | null
  inventoryStatus: InventoryStatus
  productStatus: PhysicalProductStatus
  seasonsUID: string
  unitCost: number | null
  offloadMethod: PhysicalProductOffloadMethod | null
  offloadNotes: string | null
  sellableNew: boolean | null
  sellableNewPrice: number | null
  sellableUsed: boolean | null
  sellableUsedPrice: number | null
  warehouseLocation: UpdatePhysicalProduct_warehouseLocation | null
  productVariant: UpdatePhysicalProduct_productVariant | null
}
