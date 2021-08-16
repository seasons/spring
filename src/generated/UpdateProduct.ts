/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductWhereUniqueInput, CustomProductUpdateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateProduct
// ====================================================

export interface UpdateProduct_updateProduct_functions {
  __typename: "ProductFunction";
  id: string;
  name: string | null;
}

export interface UpdateProduct_updateProduct_tags {
  __typename: "Tag";
  id: string;
  name: string;
}

export interface UpdateProduct_updateProduct {
  __typename: "Product";
  id: string;
  name: string;
  description: string | null;
  functions: UpdateProduct_updateProduct_functions[] | null;
  tags: UpdateProduct_updateProduct_tags[];
}

export interface UpdateProduct {
  updateProduct: UpdateProduct_updateProduct;
}

export interface UpdateProductVariables {
  where: ProductWhereUniqueInput;
  data: CustomProductUpdateInput;
}
