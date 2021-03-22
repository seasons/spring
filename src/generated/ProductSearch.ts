/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchResultType } from "./globalTypes"

// ====================================================
// GraphQL query operation: ProductSearch
// ====================================================

export interface ProductSearch_search_data_BrandSearchResultData {
  __typename:
    | "BrandSearchResultData"
    | "CustomerSearchResultData"
    | "PhysicalProductSearchResultData"
    | "ShopifyProductVariantSearchResultData"
}

export interface ProductSearch_search_data_ProductSearchResultData {
  __typename: "ProductSearchResultData"
  id: string
  slug: string
  name: string
  brandName: string
  image: string | null
}

export type ProductSearch_search_data =
  | ProductSearch_search_data_BrandSearchResultData
  | ProductSearch_search_data_ProductSearchResultData

export interface ProductSearch_search {
  __typename: "SearchResult"
  kindOf: SearchResultType
  data: ProductSearch_search_data
}

export interface ProductSearch {
  search: (ProductSearch_search | null)[]
}

export interface ProductSearchVariables {
  query: string
}
