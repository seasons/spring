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
} from "./globalTypes"

// ====================================================
// GraphQL query operation: ProductEditQuery
// ====================================================

export interface ProductEditQuery_bottomSizes {
  __typename: "BottomSize"
  type: BottomSizeType | null
  value: string | null
}

export interface ProductEditQuery_brands {
  __typename: "Brand"
  id: string
  brandCode: string
  name: string
  slug: string
}

export interface ProductEditQuery_inventoryStatuses_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface ProductEditQuery_inventoryStatuses {
  __typename: "__Type"
  enumValues: ProductEditQuery_inventoryStatuses_enumValues[] | null
}

export interface ProductEditQuery_physicalProductStatuses_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface ProductEditQuery_physicalProductStatuses {
  __typename: "__Type"
  enumValues: ProductEditQuery_physicalProductStatuses_enumValues[] | null
}

export interface ProductEditQuery_productArchitectures_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface ProductEditQuery_productArchitectures {
  __typename: "__Type"
  enumValues: ProductEditQuery_productArchitectures_enumValues[] | null
}

export interface ProductEditQuery_productMaterialCategories {
  __typename: "ProductMaterialCategory"
  id: string
  slug: string
}

export interface ProductEditQuery_productModels {
  __typename: "ProductModel"
  id: string
  name: string
}

export interface ProductEditQuery_productTypes_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface ProductEditQuery_productTypes {
  __typename: "__Type"
  enumValues: ProductEditQuery_productTypes_enumValues[] | null
}

export interface ProductEditQuery_tags {
  __typename: "Tag"
  name: string
}

export interface ProductEditQuery_product_images {
  __typename: "Image"
  url: string | null
}

export interface ProductEditQuery_product_brand {
  __typename: "Brand"
  id: string
  name: string
}

export interface ProductEditQuery_product_category {
  __typename: "Category"
  id: string
  name: string
}

export interface ProductEditQuery_product_variants_internalSize_top {
  __typename: "TopSize"
  id: string
  letter: LetterSize | null
}

export interface ProductEditQuery_product_variants_internalSize_bottom {
  __typename: "BottomSize"
  id: string
  value: string | null
}

export interface ProductEditQuery_product_variants_internalSize {
  __typename: "Size"
  id: string
  display: string
  productType: ProductType | null
  top: ProductEditQuery_product_variants_internalSize_top | null
  bottom: ProductEditQuery_product_variants_internalSize_bottom | null
}

export interface ProductEditQuery_product_variants_physicalProducts_warehouseLocation {
  __typename: "WarehouseLocation"
  id: string
  barcode: string
}

export interface ProductEditQuery_product_variants_physicalProducts {
  __typename: "PhysicalProduct"
  id: string
  seasonsUID: string
  barcode: string
  barcoded: boolean
  productStatus: PhysicalProductStatus
  inventoryStatus: InventoryStatus
  offloadMethod: PhysicalProductOffloadMethod | null
  offloadNotes: string | null
  warehouseLocation: ProductEditQuery_product_variants_physicalProducts_warehouseLocation | null
}

export interface ProductEditQuery_product_variants {
  __typename: "ProductVariant"
  id: string
  sku: string | null
  internalSize: ProductEditQuery_product_variants_internalSize | null
  physicalProducts: ProductEditQuery_product_variants_physicalProducts[] | null
}

export interface ProductEditQuery_product_season_internalSeason {
  __typename: "Season"
  id: string
  year: number | null
  seasonCode: SeasonCode | null
}

export interface ProductEditQuery_product_season_vendorSeason {
  __typename: "Season"
  id: string
  year: number | null
  seasonCode: SeasonCode | null
}

export interface ProductEditQuery_product_season {
  __typename: "ProductSeason"
  id: string
  internalSeason: ProductEditQuery_product_season_internalSeason | null
  vendorSeason: ProductEditQuery_product_season_vendorSeason | null
  wearableSeasons: SeasonString[]
}

export interface ProductEditQuery_product_color {
  __typename: "Color"
  id: string
  colorCode: string
  name: string
}

export interface ProductEditQuery_product_functions {
  __typename: "ProductFunction"
  id: string
  name: string | null
}

export interface ProductEditQuery_product_materialCategory {
  __typename: "ProductMaterialCategory"
  id: string
  slug: string
}

export interface ProductEditQuery_product_model {
  __typename: "ProductModel"
  id: string
  name: string
}

export interface ProductEditQuery_product_modelSize {
  __typename: "Size"
  id: string
  display: string
}

export interface ProductEditQuery_product_secondaryColor {
  __typename: "Color"
  id: string
  colorCode: string
  name: string
}

export interface ProductEditQuery_product_tags {
  __typename: "Tag"
  id: string
  name: string
}

export interface ProductEditQuery_product {
  __typename: "Product"
  id: string
  name: string
  slug: string
  description: string | null
  photographyStatus: PhotographyStatus | null
  images: ProductEditQuery_product_images[]
  retailPrice: number | null
  createdAt: any
  updatedAt: any
  publishedAt: any | null
  brand: ProductEditQuery_product_brand
  category: ProductEditQuery_product_category
  variants: ProductEditQuery_product_variants[] | null
  status: ProductStatus | null
  externalURL: string | null
  architecture: ProductArchitecture | null
  innerMaterials: string[]
  outerMaterials: string[]
  type: ProductType | null
  productFit: ProductFit | null
  season: ProductEditQuery_product_season | null
  color: ProductEditQuery_product_color
  functions: ProductEditQuery_product_functions[] | null
  materialCategory: ProductEditQuery_product_materialCategory | null
  model: ProductEditQuery_product_model | null
  modelSize: ProductEditQuery_product_modelSize | null
  secondaryColor: ProductEditQuery_product_secondaryColor | null
  tags: ProductEditQuery_product_tags[]
}

export interface ProductEditQuery {
  __typename: "Query"
  bottomSizes: (ProductEditQuery_bottomSizes | null)[]
  brands: (ProductEditQuery_brands | null)[]
  inventoryStatuses: ProductEditQuery_inventoryStatuses | null
  physicalProductStatuses: ProductEditQuery_physicalProductStatuses | null
  productArchitectures: ProductEditQuery_productArchitectures | null
  productMaterialCategories: (ProductEditQuery_productMaterialCategories | null)[]
  productModels: (ProductEditQuery_productModels | null)[]
  productTypes: ProductEditQuery_productTypes | null
  tags: (ProductEditQuery_tags | null)[]
  product: ProductEditQuery_product | null
}

export interface ProductEditQueryVariables {
  input: ProductWhereUniqueInput
}
