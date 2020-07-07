/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WarehouseLocationType } from "./globalTypes"

// ====================================================
// GraphQL query operation: GetPhysicalProductsAndWarehouseLocations
// ====================================================

export interface GetPhysicalProductsAndWarehouseLocations_physicalProducts_productVariant_product_images {
  __typename: "Image"
  id: string
  url: string | null
}

export interface GetPhysicalProductsAndWarehouseLocations_physicalProducts_productVariant_product_brand {
  __typename: "Brand"
  id: string
  brandCode: string
}

export interface GetPhysicalProductsAndWarehouseLocations_physicalProducts_productVariant_product {
  __typename: "Product"
  id: string
  images: GetPhysicalProductsAndWarehouseLocations_physicalProducts_productVariant_product_images[]
  brand: GetPhysicalProductsAndWarehouseLocations_physicalProducts_productVariant_product_brand
}

export interface GetPhysicalProductsAndWarehouseLocations_physicalProducts_productVariant {
  __typename: "ProductVariant"
  id: string
  product: GetPhysicalProductsAndWarehouseLocations_physicalProducts_productVariant_product
}

export interface GetPhysicalProductsAndWarehouseLocations_physicalProducts_warehouseLocation {
  __typename: "WarehouseLocation"
  id: string
  barcode: string
}

export interface GetPhysicalProductsAndWarehouseLocations_physicalProducts {
  __typename: "PhysicalProduct"
  id: string
  seasonsUID: string
  barcode: string
  productVariant: GetPhysicalProductsAndWarehouseLocations_physicalProducts_productVariant
  warehouseLocation: GetPhysicalProductsAndWarehouseLocations_physicalProducts_warehouseLocation | null
}

export interface GetPhysicalProductsAndWarehouseLocations_warehouseLocations {
  __typename: "WarehouseLocation"
  id: string
  barcode: string
  locationCode: string
  itemCode: string
  type: WarehouseLocationType
}

export interface GetPhysicalProductsAndWarehouseLocations {
  physicalProducts: (GetPhysicalProductsAndWarehouseLocations_physicalProducts | null)[]
  warehouseLocations: (GetPhysicalProductsAndWarehouseLocations_warehouseLocations | null)[]
}
