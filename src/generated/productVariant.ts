/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: productVariant
// ====================================================

export interface productVariant_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface productVariant_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface productVariant_productVariant_product {
  __typename: "Product";
  id: string;
  name: string;
  brand: productVariant_productVariant_product_brand;
  images: productVariant_productVariant_product_images[];
}

export interface productVariant_productVariant {
  __typename: "ProductVariant";
  id: string;
  displayShort: string | null;
  product: productVariant_productVariant_product;
}

export interface productVariant {
  productVariant: productVariant_productVariant | null;
}

export interface productVariantVariables {
  id: string;
}
