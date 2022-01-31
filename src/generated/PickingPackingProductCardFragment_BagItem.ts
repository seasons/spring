/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WarehouseLocationType } from "./globalTypes"

// ====================================================
// GraphQL fragment: PickingPackingProductCardFragment_BagItem
// ====================================================

export interface PickingPackingProductCardFragment_BagItem_physicalProduct_warehouseLocation {
  __typename: "WarehouseLocation"
  id: string
  type: WarehouseLocationType
  locationCode: string
  itemCode: string
}

export interface PickingPackingProductCardFragment_BagItem_physicalProduct_productVariant_product_images {
  __typename: "Image"
  id: string
  url: string | null
}

export interface PickingPackingProductCardFragment_BagItem_physicalProduct_productVariant_product {
  __typename: "Product"
  id: string
  images: PickingPackingProductCardFragment_BagItem_physicalProduct_productVariant_product_images[]
}

export interface PickingPackingProductCardFragment_BagItem_physicalProduct_productVariant {
  __typename: "ProductVariant"
  id: string
  product: PickingPackingProductCardFragment_BagItem_physicalProduct_productVariant_product
}

export interface PickingPackingProductCardFragment_BagItem_physicalProduct {
  __typename: "PhysicalProduct"
  id: string
  seasonsUID: string
  warehouseLocation: PickingPackingProductCardFragment_BagItem_physicalProduct_warehouseLocation | null
  productVariant: PickingPackingProductCardFragment_BagItem_physicalProduct_productVariant | null
}

export interface PickingPackingProductCardFragment_BagItem {
  __typename: "BagItem"
  physicalProduct: PickingPackingProductCardFragment_BagItem_physicalProduct | null
}
