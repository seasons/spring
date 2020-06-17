/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  InventoryStatus,
  PhysicalProductStatus,
  WarehouseLocationType,
  ProductStatus,
  ProductType,
  ReservationStatus,
} from "./globalTypes"

// ====================================================
// GraphQL fragment: GetReservation
// ====================================================

export interface GetReservation_user {
  __typename: "User"
  id: string
  email: string
  firstName: string
  lastName: string
}

export interface GetReservation_customer_user {
  __typename: "User"
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface GetReservation_customer_detail_shippingAddress {
  __typename: "Location"
  name: string
  address1: string
  address2: string | null
  city: string
  state: string
}

export interface GetReservation_customer_detail {
  __typename: "CustomerDetail"
  shippingAddress: GetReservation_customer_detail_shippingAddress | null
}

export interface GetReservation_customer {
  __typename: "Customer"
  id: string
  user: GetReservation_customer_user
  detail: GetReservation_customer_detail | null
}

export interface GetReservation_sentPackage_shippingLabel {
  __typename: "Label"
  image: string | null
  trackingNumber: string | null
  trackingURL: string | null
}

export interface GetReservation_sentPackage {
  __typename: "Package"
  id: string
  shippingLabel: GetReservation_sentPackage_shippingLabel
  weight: number | null
}

export interface GetReservation_returnedPackage_shippingLabel {
  __typename: "Label"
  image: string | null
  trackingNumber: string | null
  trackingURL: string | null
}

export interface GetReservation_returnedPackage {
  __typename: "Package"
  id: string
  shippingLabel: GetReservation_returnedPackage_shippingLabel
  weight: number | null
}

export interface GetReservation_lastLocation {
  __typename: "Location"
  id: string
}

export interface GetReservation_products_warehouseLocation {
  __typename: "WarehouseLocation"
  barcode: string
  locationCode: string
  itemCode: string
  type: WarehouseLocationType
}

export interface GetReservation_products_productVariant_product_brand {
  __typename: "Brand"
  id: string
  name: string
}

export interface GetReservation_products_productVariant_product_color {
  __typename: "Color"
  hexCode: string
  name: string
}

export interface GetReservation_products_productVariant_product_secondaryColor {
  __typename: "Color"
  hexCode: string
  name: string
}

export interface GetReservation_products_productVariant_product_images {
  __typename: "Image"
  url: string | null
}

export interface GetReservation_products_productVariant_product {
  __typename: "Product"
  id: string
  name: string
  brand: GetReservation_products_productVariant_product_brand
  description: string | null
  color: GetReservation_products_productVariant_product_color
  secondaryColor: GetReservation_products_productVariant_product_secondaryColor | null
  status: ProductStatus | null
  type: ProductType | null
  images: GetReservation_products_productVariant_product_images[]
}

export interface GetReservation_products_productVariant {
  __typename: "ProductVariant"
  id: string
  product: GetReservation_products_productVariant_product
}

export interface GetReservation_products {
  __typename: "PhysicalProduct"
  id: string
  seasonsUID: string
  inventoryStatus: InventoryStatus
  productStatus: PhysicalProductStatus
  barcode: string
  warehouseLocation: GetReservation_products_warehouseLocation | null
  productVariant: GetReservation_products_productVariant
}

export interface GetReservation_images {
  __typename: "Image"
  url: string | null
}

export interface GetReservation {
  __typename: "Reservation"
  id: string
  user: GetReservation_user
  customer: GetReservation_customer
  sentPackage: GetReservation_sentPackage | null
  returnedPackage: GetReservation_returnedPackage | null
  lastLocation: GetReservation_lastLocation | null
  products: GetReservation_products[]
  images: GetReservation_images[]
  reservationNumber: number
  shipped: boolean
  status: ReservationStatus
  shippedAt: any | null
  receivedAt: any | null
  returnAt: any | null
  createdAt: any
  updatedAt: any
}
