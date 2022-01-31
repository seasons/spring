/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SizeType, ProductType, MeasurementType, PhysicalProductStatus, InventoryStatus } from "./globalTypes"

// ====================================================
// GraphQL fragment: UpdateVariant
// ====================================================

export interface UpdateVariant_manufacturerSizes {
  __typename: "Size"
  id: string
  display: string
  type: SizeType | null
  productType: ProductType | null
}

export interface UpdateVariant_product_brand {
  __typename: "Brand"
  id: string
}

export interface UpdateVariant_product_category {
  __typename: "Category"
  id: string
  name: string
  measurementType: MeasurementType | null
}

export interface UpdateVariant_product {
  __typename: "Product"
  id: string
  name: string
  brand: UpdateVariant_product_brand
  category: UpdateVariant_product_category
}

export interface UpdateVariant_internalSize_accessory {
  __typename: "AccessorySize"
  id: string
  width: number | null
  bridge: number | null
  length: number | null
  minDrop: number | null
  maxDrop: number | null
  height: number | null
}

export interface UpdateVariant_internalSize_top {
  __typename: "TopSize"
  id: string
  sleeve: number | null
  shoulder: number | null
  chest: number | null
  neck: number | null
  length: number | null
}

export interface UpdateVariant_internalSize_bottom {
  __typename: "BottomSize"
  id: string
  waist: number | null
  rise: number | null
  hem: number | null
  inseam: number | null
}

export interface UpdateVariant_internalSize {
  __typename: "Size"
  id: string
  display: string
  productType: ProductType | null
  accessory: UpdateVariant_internalSize_accessory | null
  top: UpdateVariant_internalSize_top | null
  bottom: UpdateVariant_internalSize_bottom | null
}

export interface UpdateVariant_price {
  __typename: "ProductVariantPrice"
  id: string
  buyUsedEnabled: boolean
  buyUsedPrice: number | null
}

export interface UpdateVariant_shopifyProductVariant_image {
  __typename: "Image"
  url: string | null
}

export interface UpdateVariant_shopifyProductVariant {
  __typename: "ShopifyProductVariant"
  id: string
  externalId: string | null
  displayName: string | null
  image: UpdateVariant_shopifyProductVariant_image | null
  title: string | null
}

export interface UpdateVariant_physicalProducts_price {
  __typename: "PhysicalProductPrice"
  id: string
  buyUsedEnabled: boolean
  buyUsedPrice: number | null
}

export interface UpdateVariant_physicalProducts {
  __typename: "PhysicalProduct"
  id: string
  seasonsUID: string
  productStatus: PhysicalProductStatus
  inventoryStatus: InventoryStatus
  price: UpdateVariant_physicalProducts_price | null
}

export interface UpdateVariant {
  __typename: "ProductVariant"
  id: string
  sku: string | null
  total: number
  weight: number | null
  manufacturerSizes: UpdateVariant_manufacturerSizes[] | null
  product: UpdateVariant_product
  internalSize: UpdateVariant_internalSize | null
  price: UpdateVariant_price
  shopifyProductVariant: UpdateVariant_shopifyProductVariant | null
  physicalProducts: UpdateVariant_physicalProducts[] | null
}
