/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPhysicalProductWithImages
// ====================================================

export interface GetPhysicalProductWithImages_physicalProduct_productVariant_product_images {
  __typename: "Image";
  url: string | null;
}

export interface GetPhysicalProductWithImages_physicalProduct_productVariant_product {
  __typename: "Product";
  id: string;
  images: GetPhysicalProductWithImages_physicalProduct_productVariant_product_images[];
}

export interface GetPhysicalProductWithImages_physicalProduct_productVariant {
  __typename: "ProductVariant";
  product: GetPhysicalProductWithImages_physicalProduct_productVariant_product;
}

export interface GetPhysicalProductWithImages_physicalProduct {
  __typename: "PhysicalProduct";
  productVariant: GetPhysicalProductWithImages_physicalProduct_productVariant | null;
}

export interface GetPhysicalProductWithImages {
  physicalProduct: GetPhysicalProductWithImages_physicalProduct | null;
}

export interface GetPhysicalProductWithImagesVariables {
  id: string;
}
