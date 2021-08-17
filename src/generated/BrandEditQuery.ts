/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BrandWhereUniqueInput, CustomerStyle, BrandTier } from "./globalTypes";

// ====================================================
// GraphQL query operation: BrandEditQuery
// ====================================================

export interface BrandEditQuery_brand_logoImage {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface BrandEditQuery_brand_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface BrandEditQuery_brand_productsConnection_aggregate {
  __typename: "AggregateProduct";
  count: number;
}

export interface BrandEditQuery_brand_productsConnection {
  __typename: "ProductConnection";
  aggregate: BrandEditQuery_brand_productsConnection_aggregate;
}

export interface BrandEditQuery_brand_shopifyShop {
  __typename: "ShopifyShop";
  enabled: boolean;
  shopName: string;
}

export interface BrandEditQuery_brand {
  __typename: "Brand";
  id: string;
  name: string;
  styles: CustomerStyle[] | null;
  description: string | null;
  brandCode: string;
  since: any | null;
  published: boolean;
  featured: boolean;
  logoImage: BrandEditQuery_brand_logoImage | null;
  designer: string | null;
  basedIn: string | null;
  images: BrandEditQuery_brand_images[] | null;
  productsConnection: BrandEditQuery_brand_productsConnection;
  shopifyShop: BrandEditQuery_brand_shopifyShop | null;
  tier: BrandTier;
  websiteUrl: string | null;
}

export interface BrandEditQuery {
  brand: BrandEditQuery_brand | null;
}

export interface BrandEditQueryVariables {
  input: BrandWhereUniqueInput;
}
