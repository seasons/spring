/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateProduct
// ====================================================

export interface CreateProduct_createProduct_variants_physicalProducts {
  __typename: "PhysicalProduct";
  id: string;
  seasonsUID: string;
}

export interface CreateProduct_createProduct_variants {
  __typename: "ProductVariant";
  id: string;
  sku: string | null;
  physicalProducts: CreateProduct_createProduct_variants_physicalProducts[] | null;
}

export interface CreateProduct_createProduct {
  __typename: "Product";
  id: string;
  name: string;
  variants: CreateProduct_createProduct_variants[] | null;
}

export interface CreateProduct {
  createProduct: CreateProduct_createProduct | null;
}

export interface CreateProductVariables {
  input: ProductCreateInput;
}
