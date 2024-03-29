/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductUpsert
// ====================================================

export interface ProductUpsert_brands {
  __typename: "Brand"
  id: string
  brandCode: string
  name: string
  slug: string
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

export interface ProductUpsert_productMaterialCategories {
  __typename: "ProductMaterialCategory"
  id: string
  slug: string
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

export interface ProductUpsert {
  __typename: "Query"
  brands: (ProductUpsert_brands | null)[]
  inventoryStatuses: ProductUpsert_inventoryStatuses | null
  physicalProductStatuses: ProductUpsert_physicalProductStatuses | null
  productArchitectures: ProductUpsert_productArchitectures | null
  productMaterialCategories: (ProductUpsert_productMaterialCategories | null)[]
  productModels: (ProductUpsert_productModels | null)[]
  productTypes: ProductUpsert_productTypes | null
  tags: (ProductUpsert_tags | null)[]
}
