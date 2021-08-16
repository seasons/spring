/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerStyle } from "./globalTypes";

// ====================================================
// GraphQL query operation: productCreateBrand_Query
// ====================================================

export interface productCreateBrand_Query_brand {
  __typename: "Brand";
  id: string;
  styles: CustomerStyle[] | null;
}

export interface productCreateBrand_Query {
  brand: productCreateBrand_Query_brand | null;
}

export interface productCreateBrand_QueryVariables {
  brandID: string;
}
