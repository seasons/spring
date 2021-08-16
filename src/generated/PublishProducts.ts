/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PublishProducts
// ====================================================

export interface PublishProducts_publishProducts {
  __typename: "PublishProductsResponse";
  message: string;
  validatedIDs: (string | null)[];
  unvalidatedIDs: (string | null)[];
  status: string;
}

export interface PublishProducts {
  publishProducts: PublishProducts_publishProducts;
}

export interface PublishProductsVariables {
  productIDs?: string[] | null;
}
