/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  InventoryStatus,
  PhysicalProductStatus,
  WarehouseLocationType,
  ProductArchitecture,
  SeasonCode,
  SeasonString,
  PhotographyStatus,
  ProductStatus,
} from "./globalTypes"

// ====================================================
// GraphQL query operation: GetPhysicalProducts
// ====================================================

export interface GetPhysicalProducts_physicalProducts_warehouseLocation {
  __typename: "WarehouseLocation"
  barcode: string
  locationCode: string
  type: WarehouseLocationType
}

export interface GetPhysicalProducts_physicalProducts_productVariant_internalSize {
  __typename: "Size"
  display: string
}

export interface GetPhysicalProducts_physicalProducts_productVariant_product_category {
  __typename: "Category"
  name: string
}

export interface GetPhysicalProducts_physicalProducts_productVariant_product_brand {
  __typename: "Brand"
  name: string
}

export interface GetPhysicalProducts_physicalProducts_productVariant_product_materialCategory {
  __typename: "ProductMaterialCategory"
  slug: string
}

export interface GetPhysicalProducts_physicalProducts_productVariant_product_season_internalSeason {
  __typename: "Season"
  id: string
  year: number | null
  seasonCode: SeasonCode | null
}

export interface GetPhysicalProducts_physicalProducts_productVariant_product_season_vendorSeason {
  __typename: "Season"
  id: string
  year: number | null
  seasonCode: SeasonCode | null
}

export interface GetPhysicalProducts_physicalProducts_productVariant_product_season {
  __typename: "ProductSeason"
  id: string
  internalSeason: GetPhysicalProducts_physicalProducts_productVariant_product_season_internalSeason
  vendorSeason: GetPhysicalProducts_physicalProducts_productVariant_product_season_vendorSeason | null
  wearableSeasons: SeasonString[]
}

export interface GetPhysicalProducts_physicalProducts_productVariant_product {
  __typename: "Product"
  name: string
  publishedAt: any | null
  category: GetPhysicalProducts_physicalProducts_productVariant_product_category
  createdAt: any
  brand: GetPhysicalProducts_physicalProducts_productVariant_product_brand
  architecture: ProductArchitecture | null
  materialCategory: GetPhysicalProducts_physicalProducts_productVariant_product_materialCategory | null
  season: GetPhysicalProducts_physicalProducts_productVariant_product_season | null
  photographyStatus: PhotographyStatus | null
  status: ProductStatus | null
}

export interface GetPhysicalProducts_physicalProducts_productVariant {
  __typename: "ProductVariant"
  sku: string | null
  internalSize: GetPhysicalProducts_physicalProducts_productVariant_internalSize | null
  retailPrice: number | null
  product: GetPhysicalProducts_physicalProducts_productVariant_product
}

export interface GetPhysicalProducts_physicalProducts {
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
  warehouseLocation: GetPhysicalProducts_physicalProducts_warehouseLocation | null
  productVariant: GetPhysicalProducts_physicalProducts_productVariant
}

export interface GetPhysicalProducts {
  physicalProducts: (GetPhysicalProducts_physicalProducts | null)[]
}
