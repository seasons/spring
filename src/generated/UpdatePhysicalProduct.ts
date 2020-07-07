/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InventoryStatus, PhysicalProductStatus, PhysicalProductOffloadMethod, ProductStatus } from "./globalTypes"

// ====================================================
// GraphQL fragment: UpdatePhysicalProduct
// ====================================================

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
  productVariant: UpdatePhysicalProduct_productVariant
}
