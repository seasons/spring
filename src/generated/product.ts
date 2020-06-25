/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  PhotographyStatus,
  ProductType,
  LetterSize,
  PhysicalProductStatus,
  InventoryStatus,
  PhysicalProductOffloadMethod,
  ProductStatus,
} from "./globalTypes"

// ====================================================
// GraphQL fragment: product
// ====================================================

export interface product_images {
  __typename: "Image"
  url: string | null
}

export interface product_brand {
  __typename: "Brand"
  id: string
  name: string
}

export interface product_category {
  __typename: "Category"
  id: string
  name: string
}

export interface product_variants_internalSize_top {
  __typename: "TopSize"
  id: string
  letter: LetterSize | null
}

export interface product_variants_internalSize_bottom {
  __typename: "BottomSize"
  id: string
  value: string | null
}

export interface product_variants_internalSize {
  __typename: "Size"
  id: string
  display: string
  productType: ProductType | null
  top: product_variants_internalSize_top | null
  bottom: product_variants_internalSize_bottom | null
}

export interface product_variants_physicalProducts {
  __typename: "PhysicalProduct"
  id: string
  seasonsUID: string
  barcode: string
  productStatus: PhysicalProductStatus
  inventoryStatus: InventoryStatus
  offloadMethod: PhysicalProductOffloadMethod | null
  offloadNotes: string | null
}

export interface product_variants {
  __typename: "ProductVariant"
  id: string
  sku: string | null
  internalSize: product_variants_internalSize | null
  physicalProducts: product_variants_physicalProducts[] | null
}

export interface product {
  __typename: "Product"
  id: string
  name: string
  description: string | null
  photographyStatus: PhotographyStatus | null
  images: product_images[]
  retailPrice: number | null
  createdAt: any
  updatedAt: any
  brand: product_brand
  category: product_category
  variants: product_variants[] | null
  status: ProductStatus | null
}
