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
}

export interface ProductVariantUpsertQuery_product_variants {
  __typename: "ProductVariant"
  id: string
  sku: string | null
  internalSize: ProductVariantUpsertQuery_product_variants_internalSize | null
  physicalProducts: ProductVariantUpsertQuery_product_variants_physicalProducts[] | null
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
  id: string
  name: string
  description: string | null
  photographyStatus: PhotographyStatus | null
  images: ProductVariantUpsertQuery_product_images[]
  retailPrice: number | null
  createdAt: any
  updatedAt: any
  brand: ProductVariantUpsertQuery_product_brand
  category: ProductVariantUpsertQuery_product_category
  variants: ProductVariantUpsertQuery_product_variants[] | null
  status: ProductStatus | null
  architecture: ProductArchitecture | null
  color: ProductVariantUpsertQuery_product_color
  functions: ProductVariantUpsertQuery_product_functions[] | null
  innerMaterials: string[]
  materialCategory: ProductVariantUpsertQuery_product_materialCategory | null
  model: ProductVariantUpsertQuery_product_model | null
  modelSize: ProductVariantUpsertQuery_product_modelSize | null
  outerMaterials: string[]
  season: string | null
  secondaryColor: ProductVariantUpsertQuery_product_secondaryColor | null
  tags: ProductVariantUpsertQuery_product_tags[]
  type: ProductType | null
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
