/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FitPicStatus, FitPicReportStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: fitPic
// ====================================================

export interface fitPic_image {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface fitPic_location {
  __typename: "Location";
  city: string | null;
  state: string | null;
}

export interface fitPic_reports {
  __typename: "FitPicReport";
  id: string;
  status: FitPicReportStatus;
  reportedAt: any;
}

export interface fitPic_products {
  __typename: "Product";
  id: string;
}

export interface fitPic_user_customer_reservations_products_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface fitPic_user_customer_reservations_products_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface fitPic_user_customer_reservations_products_productVariant_product {
  __typename: "Product";
  id: string;
  name: string;
  images: fitPic_user_customer_reservations_products_productVariant_product_images[];
  brand: fitPic_user_customer_reservations_products_productVariant_product_brand;
}

export interface fitPic_user_customer_reservations_products_productVariant {
  __typename: "ProductVariant";
  id: string;
  product: fitPic_user_customer_reservations_products_productVariant_product;
}

export interface fitPic_user_customer_reservations_products {
  __typename: "PhysicalProduct";
  id: string;
  productVariant: fitPic_user_customer_reservations_products_productVariant | null;
}

export interface fitPic_user_customer_reservations {
  __typename: "Reservation";
  id: string;
  createdAt: any;
  products: fitPic_user_customer_reservations_products[];
}

export interface fitPic_user_customer {
  __typename: "Customer";
  id: string;
  reservations: fitPic_user_customer_reservations[] | null;
}

export interface fitPic_user {
  __typename: "User";
  id: string;
  customer: fitPic_user_customer | null;
}

export interface fitPic {
  __typename: "FitPic";
  id: string;
  author: string;
  status: FitPicStatus;
  createdAt: any;
  updatedAt: any;
  image: fitPic_image;
  location: fitPic_location | null;
  reports: fitPic_reports[];
  products: fitPic_products[] | null;
  user: fitPic_user;
}
