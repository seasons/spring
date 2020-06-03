/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  ProductWhereUniqueInput,
  ProductStatus,
  ProductArchitecture,
  ProductType,
  LetterSize,
  PhysicalProductStatus,
} from "./globalTypes"

// ====================================================
// GraphQL query operation: ProductEditQuery
// ====================================================

export interface ProductEditQuery_bottomSizes {
  __typename: "BottomSize"
  value: string | null
}

export interface ProductEditQuery_bottomSizeTypes_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface ProductEditQuery_bottomSizeTypes {
  __typename: "__Type"
  enumValues: ProductEditQuery_bottomSizeTypes_enumValues[] | null
}

export interface ProductEditQuery_brands {
  __typename: "Brand"
  id: string
  brandCode: string
  name: string
  slug: string
}

export interface ProductEditQuery_categories {
  __typename: "Category"
  id: string
  name: string
}

export interface ProductEditQuery_inventoryStatuses_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface ProductEditQuery_inventoryStatuses {
  __typename: "__Type"
  enumValues: ProductEditQuery_inventoryStatuses_enumValues[] | null
}

export interface ProductEditQuery_physicalProductStatuses_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface ProductEditQuery_physicalProductStatuses {
  __typename: "__Type"
  enumValues: ProductEditQuery_physicalProductStatuses_enumValues[] | null
}

export interface ProductEditQuery_productArchitectures_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface ProductEditQuery_productArchitectures {
  __typename: "__Type"
  enumValues: ProductEditQuery_productArchitectures_enumValues[] | null
}

export interface ProductEditQuery_productModels {
  __typename: "ProductModel"
  id: string
  name: string
}

export interface ProductEditQuery_productTypes_enumValues {
  __typename: "__EnumValue"
  name: string
}

export interface ProductEditQuery_productTypes {
  __typename: "__Type"
  enumValues: ProductEditQuery_productTypes_enumValues[] | null
}

export interface ProductEditQuery_tags {
  __typename: "Tag"
  name: string
}

export interface ProductEditQuery_product_images {
  __typename: "Image"
  url: string | null
}

export interface ProductEditQuery_product_brand {
  __typename: "Brand"
  id: string
  name: string
}

export interface ProductEditQuery_product_category {
  __typename: "Category"
  id: string
  name: string
}

export interface ProductEditQuery_product_color {
  __typename: "Color"
  id: string
  name: string
}

export interface ProductEditQuery_product_functions {
  __typename: "ProductFunction"
  id: string
  name: string | null
}

export interface ProductEditQuery_product_model {
  __typename: "ProductModel"
  id: string
  name: string
}

export interface ProductEditQuery_product_modelSize {
  __typename: "Size"
  id: string
  display: string
}

export interface ProductEditQuery_product_secondaryColor {
  __typename: "Color"
  id: string
  name: string
}

export interface ProductEditQuery_product_tags {
  __typename: "Tag"
  id: string
  name: string
}

export interface ProductEditQuery_product_variants_internalSize_top {
  __typename: "TopSize"
  id: string
  letter: LetterSize | null
}

export interface ProductEditQuery_product_variants_internalSize_bottom {
  __typename: "BottomSize"
  id: string
  value: string | null
}

export interface ProductEditQuery_product_variants_internalSize {
  __typename: "Size"
  id: string
  display: string
  productType: ProductType | null
  top: ProductEditQuery_product_variants_internalSize_top | null
  bottom: ProductEditQuery_product_variants_internalSize_bottom | null
}

export interface ProductEditQuery_product_variants_physicalProducts {
  __typename: "PhysicalProduct"
  id: string
  seasonsUID: string
  productStatus: PhysicalProductStatus
}

export interface ProductEditQuery_product_variants {
  __typename: "ProductVariant"
  id: string
  sku: string | null
  internalSize: ProductEditQuery_product_variants_internalSize | null
  physicalProducts: ProductEditQuery_product_variants_physicalProducts[] | null
}

export interface ProductEditQuery_product {
  __typename: "Product"
  id: string
  name: string
  description: string | null
  images: ProductEditQuery_product_images[]
  retailPrice: number | null
  createdAt: any
  updatedAt: any
  brand: ProductEditQuery_product_brand
  category: ProductEditQuery_product_category
  status: ProductStatus | null
  architecture: ProductArchitecture | null
  color: ProductEditQuery_product_color
  functions: ProductEditQuery_product_functions[] | null
  innerMaterials: string[]
  model: ProductEditQuery_product_model | null
  modelSize: ProductEditQuery_product_modelSize | null
  outerMaterials: string[]
  season: string | null
  secondaryColor: ProductEditQuery_product_secondaryColor | null
  tags: ProductEditQuery_product_tags[]
  type: ProductType | null
  variants: ProductEditQuery_product_variants[] | null
}

export interface ProductEditQuery {
  __typename: "Query"
  bottomSizes: (ProductEditQuery_bottomSizes | null)[]
  bottomSizeTypes: ProductEditQuery_bottomSizeTypes | null
  brands: (ProductEditQuery_brands | null)[]
  categories: (ProductEditQuery_categories | null)[]
  inventoryStatuses: ProductEditQuery_inventoryStatuses | null
  physicalProductStatuses: ProductEditQuery_physicalProductStatuses | null
  productArchitectures: ProductEditQuery_productArchitectures | null
  productModels: (ProductEditQuery_productModels | null)[]
  productTypes: ProductEditQuery_productTypes | null
  tags: (ProductEditQuery_tags | null)[]
  product: ProductEditQuery_product | null
}

export interface ProductEditQueryVariables {
  input: ProductWhereUniqueInput
}
