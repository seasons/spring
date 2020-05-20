/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LetterSize } from "./globalTypes"

// ====================================================
// GraphQL fragment: ProductUpsert
// ====================================================

export interface ProductUpsert_bottomSizes {
  __typename: "BottomSize"
  value: string | null
}

export interface ProductUpsert_bottomSizeTypes_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface ProductUpsert_bottomSizeTypes {
  __typename: "__Type"
  enumValues: ProductUpsert_bottomSizeTypes_enumValues[] | null
}

export interface ProductUpsert_brands {
  __typename: "Brand"
  id: string
  brandCode: string
  name: string
  slug: string
}

export interface ProductUpsert_categories {
  __typename: "Category"
  id: string
  name: string
}

export interface ProductUpsert_colors {
  __typename: "Color"
  id: string
  colorCode: string
  hexCode: string
  name: string
}

export interface ProductUpsert_inventoryStatuses_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface ProductUpsert_inventoryStatuses {
  __typename: "__Type"
  enumValues: ProductUpsert_inventoryStatuses_enumValues[] | null
}

export interface ProductUpsert_physicalProductStatuses_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface ProductUpsert_physicalProductStatuses {
  __typename: "__Type"
  enumValues: ProductUpsert_physicalProductStatuses_enumValues[] | null
}

export interface ProductUpsert_productArchitectures_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface ProductUpsert_productArchitectures {
  __typename: "__Type"
  enumValues: ProductUpsert_productArchitectures_enumValues[] | null
}

export interface ProductUpsert_productFunctions {
  __typename: "ProductFunction"
  id: string
  name: string | null
}

export interface ProductUpsert_productModels {
  __typename: "ProductModel"
  id: string
  name: string
}

export interface ProductUpsert_productTypes_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface ProductUpsert_productTypes {
  __typename: "__Type"
  enumValues: ProductUpsert_productTypes_enumValues[] | null
}

export interface ProductUpsert_tags {
  __typename: "Tag"
  name: string
}

export interface ProductUpsert_topSizes {
  __typename: "TopSize"
  letter: LetterSize | null
}

export interface ProductUpsert {
  __typename: "Query"
  bottomSizes: (ProductUpsert_bottomSizes | null)[]
  bottomSizeTypes: ProductUpsert_bottomSizeTypes | null
  brands: (ProductUpsert_brands | null)[]
  categories: (ProductUpsert_categories | null)[]
  colors: (ProductUpsert_colors | null)[]
  inventoryStatuses: ProductUpsert_inventoryStatuses | null
  physicalProductStatuses: ProductUpsert_physicalProductStatuses | null
  productArchitectures: ProductUpsert_productArchitectures | null
  productFunctions: (ProductUpsert_productFunctions | null)[]
  productModels: (ProductUpsert_productModels | null)[]
  productTypes: ProductUpsert_productTypes | null
  tags: (ProductUpsert_tags | null)[]
  topSizes: (ProductUpsert_topSizes | null)[]
}