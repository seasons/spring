/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WarehouseLocationType } from "./globalTypes"

// ====================================================
// GraphQL fragment: PhysicalProduct
// ====================================================

export interface PhysicalProduct_warehouseLocation {
  __typename: "WarehouseLocation"
  id: string
  barcode: string
  locationCode: string
  itemCode: string
  type: WarehouseLocationType
}

export interface PhysicalProduct_productVariant_product_images {
  __typename: "Image"
  url: string | null
}

export interface PhysicalProduct_productVariant_product {
  __typename: "Product"
  name: string
  images: PhysicalProduct_productVariant_product_images[]
}

export interface PhysicalProduct_productVariant {
  __typename: "ProductVariant"
  product: PhysicalProduct_productVariant_product
}

export interface PhysicalProduct {
  __typename: "PhysicalProduct"
  id: string
  seasonsUID: string
  warehouseLocation: PhysicalProduct_warehouseLocation | null
  productVariant: PhysicalProduct_productVariant
}
