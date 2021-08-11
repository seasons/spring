/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CollectionUpsertInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpsertCollection
// ====================================================

export interface UpsertCollection_upsertCollection {
  __typename: "Collection";
  id: string;
}

export interface UpsertCollection {
  upsertCollection: UpsertCollection_upsertCollection;
}

export interface UpsertCollectionVariables {
  data: CollectionUpsertInput;
}
