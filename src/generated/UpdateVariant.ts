/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductType, LetterSize, BottomSizeType, PhysicalProductStatus, InventoryStatus } from "./globalTypes"

// ====================================================
// GraphQL fragment: UpdateVariant
// ====================================================

export interface UpdateVariant_manufacturerSizes {
  __typename: "Size"
  id: string
  display: string
  productType: ProductType | null
}

export interface UpdateVariant_product {
  __typename: "Product"
  id: string
  name: string
}

export interface UpdateVariant_internalSize_top {
  __typename: "TopSize"
  id: string
  letter: LetterSize | null
  sleeve: number | null
  shoulder: number | null
  chest: number | null
  neck: number | null
  length: number | null
}

export interface UpdateVariant_internalSize_bottom {
  __typename: "BottomSize"
  id: string
  type: BottomSizeType | null
  value: string | null
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
  top: UpdateVariant_internalSize_top | null
  bottom: UpdateVariant_internalSize_bottom | null
}

export interface UpdateVariant_sellable {
  __typename: "ProductVariantSellable"
  new: boolean
  newPrice: number | null
  used: boolean
  usedPrice: number | null
}

export interface UpdateVariant_physicalProducts_sellable {
  __typename: "PhysicalProductSellable"
  id: string
  new: boolean
  used: boolean
  newPrice: number | null
  usedPrice: number | null
}

export interface UpdateVariant_physicalProducts {
  __typename: "PhysicalProduct"
  id: string
  seasonsUID: string
  productStatus: PhysicalProductStatus
  inventoryStatus: InventoryStatus
  sellable: UpdateVariant_physicalProducts_sellable | null
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
  sellable: UpdateVariant_sellable
  physicalProducts: UpdateVariant_physicalProducts[] | null
}
