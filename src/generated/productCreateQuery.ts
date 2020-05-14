/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { LetterSize } from "./globalTypes"

// ====================================================
// GraphQL query operation: productCreateQuery
// ====================================================

export interface productCreateQuery_bottomSizes {
  __typename: "BottomSize"
  value: string | null
}

export interface productCreateQuery_bottomSizeTypes_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface productCreateQuery_bottomSizeTypes {
  __typename: "__Type"
  enumValues: productCreateQuery_bottomSizeTypes_enumValues[] | null
}

export interface productCreateQuery_brands {
  __typename: "Brand"
  id: string
  brandCode: string
  name: string
  slug: string
}

export interface productCreateQuery_categories {
  __typename: "Category"
  id: string
  name: string
}

export interface productCreateQuery_colors {
  __typename: "Color"
  id: string
  colorCode: string
  hexCode: string
  name: string
}

export interface productCreateQuery_inventoryStatuses_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface productCreateQuery_inventoryStatuses {
  __typename: "__Type"
  enumValues: productCreateQuery_inventoryStatuses_enumValues[] | null
}

export interface productCreateQuery_physicalProductStatuses_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface productCreateQuery_physicalProductStatuses {
  __typename: "__Type"
  enumValues: productCreateQuery_physicalProductStatuses_enumValues[] | null
}

export interface productCreateQuery_products_tags {
  __typename: "Tag"
  name: string
}

export interface productCreateQuery_products {
  __typename: "Product"
  innerMaterials: string[]
  outerMaterials: string[]
  tags: productCreateQuery_products_tags[]
}

export interface productCreateQuery_productArchitectures_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface productCreateQuery_productArchitectures {
  __typename: "__Type"
  enumValues: productCreateQuery_productArchitectures_enumValues[] | null
}

export interface productCreateQuery_productFunctions {
  __typename: "ProductFunction"
  id: string
  name: string | null
}

export interface productCreateQuery_productModels {
  __typename: "ProductModel"
  id: string
  name: string
}

export interface productCreateQuery_productTypes_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface productCreateQuery_productTypes {
  __typename: "__Type"
  enumValues: productCreateQuery_productTypes_enumValues[] | null
}

export interface productCreateQuery_topSizes {
  __typename: "TopSize"
  letter: LetterSize | null
}

export interface productCreateQuery {
  bottomSizes: (productCreateQuery_bottomSizes | null)[]
  bottomSizeTypes: productCreateQuery_bottomSizeTypes | null
  brands: (productCreateQuery_brands | null)[]
  categories: (productCreateQuery_categories | null)[]
  colors: (productCreateQuery_colors | null)[]
  inventoryStatuses: productCreateQuery_inventoryStatuses | null
  physicalProductStatuses: productCreateQuery_physicalProductStatuses | null
  products: (productCreateQuery_products | null)[]
  productArchitectures: productCreateQuery_productArchitectures | null
  productFunctions: (productCreateQuery_productFunctions | null)[]
  productModels: (productCreateQuery_productModels | null)[]
  productTypes: productCreateQuery_productTypes | null
  topSizes: (productCreateQuery_topSizes | null)[]
}
