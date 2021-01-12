/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductVariantSKUsInput, BottomSizeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetGeneratedVariantSkus
// ====================================================

export interface GetGeneratedVariantSkus_bottomSizeTypes_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface GetGeneratedVariantSkus_bottomSizeTypes {
  __typename: "__Type";
  enumValues: GetGeneratedVariantSkus_bottomSizeTypes_enumValues[] | null;
}

export interface GetGeneratedVariantSkus_bottomSizes {
  __typename: "BottomSize";
  type: BottomSizeType | null;
  value: string | null;
}

export interface GetGeneratedVariantSkus {
  bottomSizeTypes: GetGeneratedVariantSkus_bottomSizeTypes | null;
  bottomSizes: (GetGeneratedVariantSkus_bottomSizes | null)[];
  generatedVariantSKUs: string[] | null;
}

export interface GetGeneratedVariantSkusVariables {
  input: ProductVariantSKUsInput;
}
