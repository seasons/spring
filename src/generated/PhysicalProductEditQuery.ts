/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  PhysicalProductWhereUniqueInput,
  InventoryStatus,
  PhysicalProductStatus,
  PhysicalProductOffloadMethod,
  ProductStatus,
} from "./globalTypes"

// ====================================================
// GraphQL query operation: PhysicalProductEditQuery
// ====================================================

export interface PhysicalProductEditQuery_inventoryStatuses_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface PhysicalProductEditQuery_inventoryStatuses {
  __typename: "__Type"
  enumValues: PhysicalProductEditQuery_inventoryStatuses_enumValues[] | null
}

export interface PhysicalProductEditQuery_physicalProductStatuses_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface PhysicalProductEditQuery_physicalProductStatuses {
  __typename: "__Type"
  enumValues: PhysicalProductEditQuery_physicalProductStatuses_enumValues[] | null
}

export interface PhysicalProductEditQuery_physicalProduct_productVariant_product {
  __typename: "Product"
  id: string
  status: ProductStatus | null
  name: string
}

export interface PhysicalProductEditQuery_physicalProduct_productVariant {
  __typename: "ProductVariant"
  id: string
  sku: string | null
  product: PhysicalProductEditQuery_physicalProduct_productVariant_product
}

export interface PhysicalProductEditQuery_physicalProduct {
  __typename: "PhysicalProduct"
  id: string
  dateOrdered: any | null
  dateReceived: any | null
  inventoryStatus: InventoryStatus
  productStatus: PhysicalProductStatus
  seasonsUID: string
  unitCost: number | null
  offloadMethod: PhysicalProductOffloadMethod | null
  offloadNotes: string | null
  productVariant: PhysicalProductEditQuery_physicalProduct_productVariant
}

export interface PhysicalProductEditQuery {
  __typename: "Query"
  inventoryStatuses: PhysicalProductEditQuery_inventoryStatuses | null
  physicalProductStatuses: PhysicalProductEditQuery_physicalProductStatuses | null
  physicalProduct: PhysicalProductEditQuery_physicalProduct | null
}

export interface PhysicalProductEditQueryVariables {
  where: PhysicalProductWhereUniqueInput
}
