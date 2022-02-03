/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WarehouseLocationType } from "./globalTypes"

// ====================================================
// GraphQL fragment: PickingPackingModalFragment_BagSection
// ====================================================

export interface PickingPackingModalFragment_BagSection_bagItems_physicalProduct_warehouseLocation {
  __typename: "WarehouseLocation"
  id: string
  type: WarehouseLocationType
  locationCode: string
  itemCode: string
}

export interface PickingPackingModalFragment_BagSection_bagItems_physicalProduct_productVariant_product_images {
  __typename: "Image"
  id: string
  url: string | null
}

export interface PickingPackingModalFragment_BagSection_bagItems_physicalProduct_productVariant_product {
  __typename: "Product"
  id: string
  images: PickingPackingModalFragment_BagSection_bagItems_physicalProduct_productVariant_product_images[]
}

export interface PickingPackingModalFragment_BagSection_bagItems_physicalProduct_productVariant {
  __typename: "ProductVariant"
  id: string
  product: PickingPackingModalFragment_BagSection_bagItems_physicalProduct_productVariant_product
}

export interface PickingPackingModalFragment_BagSection_bagItems_physicalProduct {
  __typename: "PhysicalProduct"
  id: string
  barcode: string
  seasonsUID: string
  warehouseLocation: PickingPackingModalFragment_BagSection_bagItems_physicalProduct_warehouseLocation | null
  productVariant: PickingPackingModalFragment_BagSection_bagItems_physicalProduct_productVariant | null
}

export interface PickingPackingModalFragment_BagSection_bagItems_productVariant_product {
  __typename: "Product"
  id: string
}

export interface PickingPackingModalFragment_BagSection_bagItems_productVariant {
  __typename: "ProductVariant"
  id: string
  product: PickingPackingModalFragment_BagSection_bagItems_productVariant_product
}

export interface PickingPackingModalFragment_BagSection_bagItems {
  __typename: "BagItem"
  id: string
  physicalProduct: PickingPackingModalFragment_BagSection_bagItems_physicalProduct | null
  productVariant: PickingPackingModalFragment_BagSection_bagItems_productVariant
}

export interface PickingPackingModalFragment_BagSection {
  __typename: "BagSection"
  id: string
  bagItems: PickingPackingModalFragment_BagSection_bagItems[] | null
}
