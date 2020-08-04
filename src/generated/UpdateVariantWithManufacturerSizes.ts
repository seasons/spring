/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  UpdateVariantInput,
  ProductType,
  LetterSize,
  BottomSizeType,
  PhysicalProductStatus,
  InventoryStatus,
} from "./globalTypes"

// ====================================================
// GraphQL mutation operation: UpdateVariantWithManufacturerSizes
// ====================================================

export interface UpdateVariantWithManufacturerSizes_updateVariantWithManufacturerSizes_manufacturerSizes {
  __typename: "Size"
  id: string
  display: string
  productType: ProductType | null
}

export interface UpdateVariantWithManufacturerSizes_updateVariantWithManufacturerSizes_product {
  __typename: "Product"
  id: string
  name: string
}

export interface UpdateVariantWithManufacturerSizes_updateVariantWithManufacturerSizes_internalSize_top {
  __typename: "TopSize"
  id: string
  letter: LetterSize | null
  sleeve: number | null
  shoulder: number | null
  chest: number | null
  neck: number | null
  length: number | null
}

export interface UpdateVariantWithManufacturerSizes_updateVariantWithManufacturerSizes_internalSize_bottom {
  __typename: "BottomSize"
  id: string
  type: BottomSizeType | null
  value: string | null
  waist: number | null
  rise: number | null
  hem: number | null
  inseam: number | null
}

export interface UpdateVariantWithManufacturerSizes_updateVariantWithManufacturerSizes_internalSize {
  __typename: "Size"
  id: string
  display: string
  productType: ProductType | null
  top: UpdateVariantWithManufacturerSizes_updateVariantWithManufacturerSizes_internalSize_top | null
  bottom: UpdateVariantWithManufacturerSizes_updateVariantWithManufacturerSizes_internalSize_bottom | null
}

export interface UpdateVariantWithManufacturerSizes_updateVariantWithManufacturerSizes_physicalProducts {
  __typename: "PhysicalProduct"
  id: string
  seasonsUID: string
  productStatus: PhysicalProductStatus
  inventoryStatus: InventoryStatus
}

export interface UpdateVariantWithManufacturerSizes_updateVariantWithManufacturerSizes {
  __typename: "ProductVariant"
  id: string
  sku: string | null
  total: number
  weight: number | null
  manufacturerSizes: UpdateVariantWithManufacturerSizes_updateVariantWithManufacturerSizes_manufacturerSizes[] | null
  product: UpdateVariantWithManufacturerSizes_updateVariantWithManufacturerSizes_product
  internalSize: UpdateVariantWithManufacturerSizes_updateVariantWithManufacturerSizes_internalSize | null
  physicalProducts: UpdateVariantWithManufacturerSizes_updateVariantWithManufacturerSizes_physicalProducts[] | null
}

export interface UpdateVariantWithManufacturerSizes {
  updateVariantWithManufacturerSizes: UpdateVariantWithManufacturerSizes_updateVariantWithManufacturerSizes | null
}

export interface UpdateVariantWithManufacturerSizesVariables {
  input: UpdateVariantInput
}
