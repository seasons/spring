/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchResultType, InventoryStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: Search
// ====================================================

export interface Search_search_data_PhysicalProductSearchResultData {
  __typename: "PhysicalProductSearchResultData";
  id: string;
  inventoryStatus: InventoryStatus | null;
  barcode: string;
  productName: string;
  seasonsUID: string;
}

export interface Search_search_data_ProductSearchResultData {
  __typename: "ProductSearchResultData";
  id: string;
  slug: string;
  name: string;
  brandName: string;
  image: string | null;
  description: string | null;
  variantsCount: number;
  physicalProductsCount: number;
}

export type Search_search_data = Search_search_data_PhysicalProductSearchResultData | Search_search_data_ProductSearchResultData;

export interface Search_search {
  __typename: "SearchResult";
  kindOf: SearchResultType;
  data: Search_search_data;
}

export interface Search {
  search: (Search_search | null)[];
}

export interface SearchVariables {
  query: string;
}
