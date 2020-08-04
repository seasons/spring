/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  InventoryStatus,
  PhysicalProductStatus,
  WarehouseLocationType,
  ProductArchitecture,
  PhotographyStatus,
  ProductStatus,
} from "./globalTypes"

// ====================================================
// GraphQL fragment: PhysicalProduct
// ====================================================

export interface PhysicalProduct_warehouseLocation {
  __typename: "WarehouseLocation"
  barcode: string
  locationCode: string
  type: WarehouseLocationType
}

export interface PhysicalProduct_productVariant_internalSize {
  __typename: "Size"
  display: string
}

export interface PhysicalProduct_productVariant_product_category {
  __typename: "Category"
  name: string
}

export interface PhysicalProduct_productVariant_product_brand {
  __typename: "Brand"
  name: string
}

export interface PhysicalProduct_productVariant_product_materialCategory {
  __typename: "ProductMaterialCategory"
  slug: string
}

export interface PhysicalProduct_productVariant_product {
  __typename: "Product"
  name: string
  publishedAt: any | null
  category: PhysicalProduct_productVariant_product_category
  createdAt: any
  brand: PhysicalProduct_productVariant_product_brand
  architecture: ProductArchitecture | null
  materialCategory: PhysicalProduct_productVariant_product_materialCategory | null
  season: string | null
  photographyStatus: PhotographyStatus | null
  status: ProductStatus | null
}

export interface PhysicalProduct_productVariant {
  __typename: "ProductVariant"
  sku: string | null
  internalSize: PhysicalProduct_productVariant_internalSize | null
  retailPrice: number | null
  product: PhysicalProduct_productVariant_product
}

export interface PhysicalProduct {
  __typename: "PhysicalProduct"
  id: string
  seasonsUID: string
  inventoryStatus: InventoryStatus
  sequenceNumber: number
  unitCost: number | null
  dateOrdered: any | null
  dateReceived: any | null
  productStatus: PhysicalProductStatus
  createdAt: any
  warehouseLocation: PhysicalProduct_warehouseLocation | null
  productVariant: PhysicalProduct_productVariant
}
