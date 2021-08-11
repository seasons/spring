/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LaunchCreateQuery
// ====================================================

export interface LaunchCreateQuery_brands {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface LaunchCreateQuery_collections {
  __typename: "Collection";
  id: string;
  title: string | null;
}

export interface LaunchCreateQuery {
  brands: (LaunchCreateQuery_brands | null)[];
  collections: (LaunchCreateQuery_collections | null)[];
}
