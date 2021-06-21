/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  CustomerStatus,
  PackageTransitEventStatus,
  AdminAction,
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
  id: string
  name: string | null
  address1: string | null
  address2: string | null
  city: string | null
  state: string | null
}

export interface GetReservation_customer_detail {
  __typename: "CustomerDetail"
  id: string
  shippingAddress: GetReservation_customer_detail_shippingAddress | null
}

export interface GetReservation_customer_reservations {
  __typename: "Reservation"
  id: string
}

export interface GetReservation_customer {
  __typename: "Customer"
  id: string
  status: CustomerStatus | null
  user: GetReservation_customer_user
  detail: GetReservation_customer_detail | null
  reservations: GetReservation_customer_reservations[] | null
}

export interface GetReservation_sentPackage_shippingLabel {
  __typename: "Label"
  id: string
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
  id: string
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

export interface GetReservation_returnedProducts_productVariant_product_images {
  __typename: "Image"
  url: string | null
}

export interface GetReservation_returnedProducts_productVariant_product {
  __typename: "Product"
  id: string
  images: GetReservation_returnedProducts_productVariant_product_images[]
}

export interface GetReservation_returnedProducts_productVariant {
  __typename: "ProductVariant"
  id: string
  product: GetReservation_returnedProducts_productVariant_product
}

export interface GetReservation_returnedProducts {
  __typename: "PhysicalProduct"
  id: string
  productVariant: GetReservation_returnedProducts_productVariant | null
}

export interface GetReservation_packageEvents {
  __typename: "PackageTransitEvent"
  id: string
  data: any
  status: PackageTransitEventStatus
  createdAt: any
  updatedAt: any
}

export interface GetReservation_adminLogs_interpretation {
  __typename: "AdminActionLogInterpretation"
  id: string
  interpretation: string | null
}

export interface GetReservation_adminLogs_activeAdminUser {
  __typename: "User"
  id: string
  fullName: string
}

export interface GetReservation_adminLogs {
  __typename: "AdminActionLog"
  action: AdminAction
  triggeredAt: any
  changedFields: any | null
  rowData: any
  entityId: string
  interpretation: GetReservation_adminLogs_interpretation | null
  activeAdminUser: GetReservation_adminLogs_activeAdminUser
}

export interface GetReservation_lastLocation {
  __typename: "Location"
  id: string
  slug: string | null
  address1: string | null
  address2: string | null
  city: string | null
  state: string | null
}

export interface GetReservation_products_location {
  __typename: "Location"
  id: string
  slug: string | null
}

export interface GetReservation_products_warehouseLocation {
  __typename: "WarehouseLocation"
  id: string
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
  id: string
  hexCode: string
  name: string
}

export interface GetReservation_products_productVariant_product_secondaryColor {
  __typename: "Color"
  id: string
  hexCode: string
  name: string
}

export interface GetReservation_products_productVariant_product_images {
  __typename: "Image"
  id: string
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
  location: GetReservation_products_location | null
  warehouseLocation: GetReservation_products_warehouseLocation | null
  productVariant: GetReservation_products_productVariant | null
}

export interface GetReservation_newProducts {
  __typename: "PhysicalProduct"
  id: string
  seasonsUID: string
  barcode: string
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
  returnedProducts: GetReservation_returnedProducts[]
  packageEvents: GetReservation_packageEvents[] | null
  adminLogs: GetReservation_adminLogs[]
  lastLocation: GetReservation_lastLocation | null
  products: GetReservation_products[]
  newProducts: GetReservation_newProducts[]
  images: GetReservation_images[]
  reservationNumber: number
  shipped: boolean
  status: ReservationStatus
  shippedAt: any | null
  receivedAt: any | null
  returnAt: any | null
  statusUpdatedAt: any | null
  createdAt: any
  updatedAt: any
}
