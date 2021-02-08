/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  ProductWhereUniqueInput,
  BottomSizeType,
  PhotographyStatus,
  ProductType,
  LetterSize,
  PhysicalProductStatus,
  InventoryStatus,
  PhysicalProductOffloadMethod,
  ProductStatus,
  ProductArchitecture,
  ProductFit,
  SeasonCode,
  SeasonString,
  ProductTierName,
} from "./globalTypes"

// ====================================================
// GraphQL query operation: ProductVariantUpsertQuery
// ====================================================

export interface ProductVariantUpsertQuery_bottomSizes {
  __typename: "BottomSize"
  type: BottomSizeType | null
  value: string | null
}

export interface ProductVariantUpsertQuery_inventoryStatuses_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface ProductVariantUpsertQuery_inventoryStatuses {
  __typename: "__Type"
  enumValues: ProductVariantUpsertQuery_inventoryStatuses_enumValues[] | null
}

export interface ProductVariantUpsertQuery_physicalProductStatuses_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface ProductVariantUpsertQuery_physicalProductStatuses {
  __typename: "__Type"
  enumValues: ProductVariantUpsertQuery_physicalProductStatuses_enumValues[] | null
}

export interface ProductVariantUpsertQuery_product_images {
  __typename: "Image"
  url: string | null
}

export interface ProductVariantUpsertQuery_product_brand {
  __typename: "Brand"
  id: string
  name: string
}

export interface ProductVariantUpsertQuery_product_category {
  __typename: "Category"
  id: string
  name: string
}

export interface ProductVariantUpsertQuery_product_variants_internalSize_top {
  __typename: "TopSize"
  id: string
  letter: LetterSize | null
}

export interface ProductVariantUpsertQuery_product_variants_internalSize_bottom {
  __typename: "BottomSize"
  id: string
  value: string | null
}

export interface ProductVariantUpsertQuery_product_variants_internalSize {
  __typename: "Size"
  id: string
  display: string
  productType: ProductType | null
  top: ProductVariantUpsertQuery_product_variants_internalSize_top | null
  bottom: ProductVariantUpsertQuery_product_variants_internalSize_bottom | null
}

export interface ProductVariantUpsertQuery_product_variants_physicalProducts_warehouseLocation {
  __typename: "WarehouseLocation"
  id: string
  barcode: string
}

export interface ProductVariantUpsertQuery_product_variants_physicalProducts {
  __typename: "PhysicalProduct"
  id: string
  seasonsUID: string
  barcode: string
  barcoded: boolean
  productStatus: PhysicalProductStatus
  inventoryStatus: InventoryStatus
  offloadMethod: PhysicalProductOffloadMethod | null
  offloadNotes: string | null
  warehouseLocation: ProductVariantUpsertQuery_product_variants_physicalProducts_warehouseLocation | null
}

export interface ProductVariantUpsertQuery_product_variants {
  __typename: "ProductVariant"
  id: string
  sku: string | null
  internalSize: ProductVariantUpsertQuery_product_variants_internalSize | null
  physicalProducts: ProductVariantUpsertQuery_product_variants_physicalProducts[] | null
}

export interface ProductVariantUpsertQuery_product_season_internalSeason {
  __typename: "Season"
  id: string
  year: number | null
  seasonCode: SeasonCode | null
}

export interface ProductVariantUpsertQuery_product_season_vendorSeason {
  __typename: "Season"
  id: string
  year: number | null
  seasonCode: SeasonCode | null
}

export interface ProductVariantUpsertQuery_product_season {
  __typename: "ProductSeason"
  id: string
  internalSeason: ProductVariantUpsertQuery_product_season_internalSeason | null
  vendorSeason: ProductVariantUpsertQuery_product_season_vendorSeason | null
  wearableSeasons: SeasonString[]
}

export interface ProductVariantUpsertQuery_product_tier {
  __typename: "ProductTier"
  id: string
  tier: ProductTierName
  price: number
}

export interface ProductVariantUpsertQuery_product_color {
  __typename: "Color"
  id: string
  colorCode: string
  name: string
}

export interface ProductVariantUpsertQuery_product_functions {
  __typename: "ProductFunction"
  id: string
  name: string | null
}

export interface ProductVariantUpsertQuery_product_materialCategory {
  __typename: "ProductMaterialCategory"
  id: string
  slug: string
}

export interface ProductVariantUpsertQuery_product_model {
  __typename: "ProductModel"
  id: string
  name: string
}

export interface ProductVariantUpsertQuery_product_modelSize {
  __typename: "Size"
  id: string
  display: string
}

export interface ProductVariantUpsertQuery_product_secondaryColor {
  __typename: "Color"
  id: string
  colorCode: string
  name: string
}

export interface ProductVariantUpsertQuery_product_tags {
  __typename: "Tag"
  id: string
  name: string
}

export interface ProductVariantUpsertQuery_product {
  __typename: "Product"
  slug: string
  id: string
  name: string
  description: string | null
  photographyStatus: PhotographyStatus | null
  images: ProductVariantUpsertQuery_product_images[]
  retailPrice: number | null
  createdAt: any
  updatedAt: any
  publishedAt: any | null
  brand: ProductVariantUpsertQuery_product_brand
  category: ProductVariantUpsertQuery_product_category
  variants: ProductVariantUpsertQuery_product_variants[] | null
  status: ProductStatus | null
  externalURL: string | null
  architecture: ProductArchitecture | null
  innerMaterials: string[]
  outerMaterials: string[]
  type: ProductType | null
  productFit: ProductFit | null
  buyNewEnabled: boolean
  buyUsedEnabled: boolean
  buyUsedPrice: number | null
  season: ProductVariantUpsertQuery_product_season | null
  tier: ProductVariantUpsertQuery_product_tier
  color: ProductVariantUpsertQuery_product_color
  functions: ProductVariantUpsertQuery_product_functions[] | null
  materialCategory: ProductVariantUpsertQuery_product_materialCategory | null
  model: ProductVariantUpsertQuery_product_model | null
  modelSize: ProductVariantUpsertQuery_product_modelSize | null
  secondaryColor: ProductVariantUpsertQuery_product_secondaryColor | null
  tags: ProductVariantUpsertQuery_product_tags[]
}

export interface ProductVariantUpsertQuery {
  bottomSizes: (ProductVariantUpsertQuery_bottomSizes | null)[]
  inventoryStatuses: ProductVariantUpsertQuery_inventoryStatuses | null
  physicalProductStatuses: ProductVariantUpsertQuery_physicalProductStatuses | null
  product: ProductVariantUpsertQuery_product | null
}

export interface ProductVariantUpsertQueryVariables {
  input: ProductWhereUniqueInput
}
