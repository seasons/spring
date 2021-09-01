/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  ProductVariantWhereUniqueInput,
  SizeType,
  ProductType,
  MeasurementType,
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
  type: SizeType | null
  productType: ProductType | null
}

export interface VariantEditQuery_productVariant_product_brand {
  __typename: "Brand"
  id: string
}

export interface VariantEditQuery_productVariant_product_category {
  __typename: "Category"
  id: string
  name: string
  measurementType: MeasurementType | null
}

export interface VariantEditQuery_productVariant_product {
  __typename: "Product"
  id: string
  name: string
  brand: VariantEditQuery_productVariant_product_brand
  category: VariantEditQuery_productVariant_product_category
}

export interface VariantEditQuery_productVariant_internalSize_accessory {
  __typename: "AccessorySize"
  id: string
  width: number | null
  bridge: number | null
  length: number | null
}

export interface VariantEditQuery_productVariant_internalSize_top {
  __typename: "TopSize"
  id: string
  sleeve: number | null
  shoulder: number | null
  chest: number | null
  neck: number | null
  length: number | null
}

export interface VariantEditQuery_productVariant_internalSize_bottom {
  __typename: "BottomSize"
  id: string
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
  accessory: VariantEditQuery_productVariant_internalSize_accessory | null
  top: VariantEditQuery_productVariant_internalSize_top | null
  bottom: VariantEditQuery_productVariant_internalSize_bottom | null
}

export interface VariantEditQuery_productVariant_price {
  __typename: "ProductVariantPrice"
  id: string
  buyUsedEnabled: boolean
  buyUsedPrice: number | null
}

export interface VariantEditQuery_productVariant_shopifyProductVariant_image {
  __typename: "Image"
  url: string | null
}

export interface VariantEditQuery_productVariant_shopifyProductVariant {
  __typename: "ShopifyProductVariant"
  id: string
  externalId: string | null
  displayName: string | null
  image: VariantEditQuery_productVariant_shopifyProductVariant_image | null
  title: string | null
}

export interface VariantEditQuery_productVariant_physicalProducts_price {
  __typename: "PhysicalProductPrice"
  id: string
  buyUsedEnabled: boolean
  buyUsedPrice: number | null
}

export interface VariantEditQuery_productVariant_physicalProducts {
  __typename: "PhysicalProduct"
  id: string
  seasonsUID: string
  productStatus: PhysicalProductStatus
  inventoryStatus: InventoryStatus
  price: VariantEditQuery_productVariant_physicalProducts_price | null
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
  price: VariantEditQuery_productVariant_price
  shopifyProductVariant: VariantEditQuery_productVariant_shopifyProductVariant | null
  physicalProducts: VariantEditQuery_productVariant_physicalProducts[] | null
}

export interface VariantEditQuery {
  productVariant: VariantEditQuery_productVariant | null
}

export interface VariantEditQueryVariables {
  where: ProductVariantWhereUniqueInput
}
