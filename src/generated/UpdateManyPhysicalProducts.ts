/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PhysicalProductWhereInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateManyPhysicalProducts
// ====================================================

export interface UpdateManyPhysicalProducts_updateManyPhysicalProducts {
  __typename: "BatchPayload";
  count: any;
}

export interface UpdateManyPhysicalProducts {
  updateManyPhysicalProducts: UpdateManyPhysicalProducts_updateManyPhysicalProducts;
}

export interface UpdateManyPhysicalProductsVariables {
  where?: PhysicalProductWhereInput | null;
}
