/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpsertVariantInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpsertProductVariants
// ====================================================

export interface UpsertProductVariants_upsertProductVariants {
  __typename: "ProductVariant";
  id: string;
  sku: string | null;
  total: number;
  weight: number | null;
}

export interface UpsertProductVariants {
  upsertProductVariants: UpsertProductVariants_upsertProductVariants[] | null;
}

export interface UpsertProductVariantsVariables {
  productID: string;
  inputs: UpsertVariantInput[];
}
