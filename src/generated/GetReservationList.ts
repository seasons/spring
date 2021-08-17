/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerStatus, ReservationPhase, ReservationStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: GetReservationList
// ====================================================

export interface GetReservationList_customer_user {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface GetReservationList_customer_reservations {
  __typename: "Reservation";
  id: string;
}

export interface GetReservationList_customer {
  __typename: "Customer";
  id: string;
  status: CustomerStatus | null;
  user: GetReservationList_customer_user;
  reservations: GetReservationList_customer_reservations[] | null;
}

export interface GetReservationList_images {
  __typename: "Image";
  url: string | null;
}

export interface GetReservationList_returnedProducts_productVariant_product_images {
  __typename: "Image";
  url: string | null;
}

export interface GetReservationList_returnedProducts_productVariant_product {
  __typename: "Product";
  id: string;
  images: GetReservationList_returnedProducts_productVariant_product_images[];
}

export interface GetReservationList_returnedProducts_productVariant {
  __typename: "ProductVariant";
  id: string;
  product: GetReservationList_returnedProducts_productVariant_product;
}

export interface GetReservationList_returnedProducts {
  __typename: "PhysicalProduct";
  id: string;
  productVariant: GetReservationList_returnedProducts_productVariant | null;
}

export interface GetReservationList {
  __typename: "Reservation";
  id: string;
  customer: GetReservationList_customer;
  images: GetReservationList_images[];
  returnedProducts: GetReservationList_returnedProducts[];
  phase: ReservationPhase;
  reservationNumber: number;
  shipped: boolean;
  status: ReservationStatus;
  shippedAt: any | null;
  statusUpdatedAt: any | null;
  returnAt: any | null;
  returnedAt: any | null;
  createdAt: any;
}
