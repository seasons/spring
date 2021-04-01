/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchResultType } from "./globalTypes"

// ====================================================
// GraphQL query operation: ShopifyProductVariantSearch
// ====================================================

export interface ShopifyProductVariantSearch_search_data_BrandSearchResultData {
  __typename:
    | "BrandSearchResultData"
    | "CustomerSearchResultData"
    | "ProductSearchResultData"
    | "PhysicalProductSearchResultData"
}

export interface ShopifyProductVariantSearch_search_data_ShopifyProductVariantSearchResultData_selectedOptions {
  __typename: "ShopifyProductVariantSelectedOption"
  name: string
  value: string
}

export interface ShopifyProductVariantSearch_search_data_ShopifyProductVariantSearchResultData {
  __typename: "ShopifyProductVariantSearchResultData"
  id: string
  brandID: string
  externalID: string
  displayName: string | null
  selectedOptions:
    | ShopifyProductVariantSearch_search_data_ShopifyProductVariantSearchResultData_selectedOptions[]
    | null
  title: string | null
  image: string | null
}

export type ShopifyProductVariantSearch_search_data =
  | ShopifyProductVariantSearch_search_data_BrandSearchResultData
  | ShopifyProductVariantSearch_search_data_ShopifyProductVariantSearchResultData

export interface ShopifyProductVariantSearch_search {
  __typename: "SearchResult"
  kindOf: SearchResultType
  data: ShopifyProductVariantSearch_search_data
}

export interface ShopifyProductVariantSearch {
  search: (ShopifyProductVariantSearch_search | null)[]
}

export interface ShopifyProductVariantSearchVariables {
  query: string
}
