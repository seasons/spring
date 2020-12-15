/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  ProductVariantWhereUniqueInput,
  ProductType,
  LetterSize,
  BottomSizeType,
  PhysicalProductStatus,
  InventoryStatus,
} from "./globalTypes"

// ====================================================
// GraphQL query operation: VariantEditQuery
// ====================================================

export interface VariantEditQuery_productVariant_manufacturerSizes {
  __typename: "Size"
  id: string
  display: string
  productType: ProductType | null
}

export interface VariantEditQuery_productVariant_product {
  __typename: "Product"
  id: string
  name: string
}

export interface VariantEditQuery_productVariant_internalSize_top {
  __typename: "TopSize"
  id: string
  letter: LetterSize | null
  sleeve: number | null
  shoulder: number | null
  chest: number | null
  neck: number | null
  length: number | null
}

export interface VariantEditQuery_productVariant_internalSize_bottom {
  __typename: "BottomSize"
  id: string
  type: BottomSizeType | null
  value: string | null
  waist: number | null
  rise: number | null
  hem: number | null
  inseam: number | null
}

export interface VariantEditQuery_productVariant_internalSize {
  __typename: "Size"
  id: string
  display: string
  productType: ProductType | null
  top: VariantEditQuery_productVariant_internalSize_top | null
  bottom: VariantEditQuery_productVariant_internalSize_bottom | null
}

export interface VariantEditQuery_productVariant_physicalProducts {
  __typename: "PhysicalProduct"
  id: string
  seasonsUID: string
  productStatus: PhysicalProductStatus
  inventoryStatus: InventoryStatus
  sellableNew: boolean | null
  sellableNewPrice: number | null
  sellableUsed: boolean | null
  sellableUsedPrice: number | null
}

export interface VariantEditQuery_productVariant {
  __typename: "ProductVariant"
  id: string
  sku: string | null
  total: number
  weight: number | null
  manufacturerSizes: VariantEditQuery_productVariant_manufacturerSizes[] | null
  product: VariantEditQuery_productVariant_product
  internalSize: VariantEditQuery_productVariant_internalSize | null
  sellableNew: boolean
  sellableNewPrice: number | null
  sellableUsed: boolean
  sellableUsedPrice: number | null
  physicalProducts: VariantEditQuery_productVariant_physicalProducts[] | null
}

export interface VariantEditQuery {
  productVariant: VariantEditQuery_productVariant | null
}

export interface VariantEditQueryVariables {
  where: ProductVariantWhereUniqueInput
}
