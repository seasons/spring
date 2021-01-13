/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  InventoryStatus,
  PhysicalProductStatus,
  ReservationStatus,
  ReservationPhase,
  WarehouseLocationType,
  ProductArchitecture,
  PhotographyStatus,
  ProductStatus,
} from "./globalTypes"

// ====================================================
// GraphQL query operation: GetPhysicalProducts
// ====================================================

export interface GetPhysicalProducts_physicalProducts_price {
  __typename: "PhysicalProductPrice"
  id: string
  buyUsedPrice: number | null
  buyUsedEnabled: boolean
}

export interface GetPhysicalProducts_physicalProducts_reservations_customer_user {
  __typename: "User"
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface GetPhysicalProducts_physicalProducts_reservations_customer {
  __typename: "Customer"
  id: string
  user: GetPhysicalProducts_physicalProducts_reservations_customer_user
}

export interface GetPhysicalProducts_physicalProducts_reservations_images {
  __typename: "Image"
  url: string | null
}

export interface GetPhysicalProducts_physicalProducts_reservations_products {
  __typename: "PhysicalProduct"
  id: string
}

export interface GetPhysicalProducts_physicalProducts_reservations {
  __typename: "Reservation"
  id: string
  customer: GetPhysicalProducts_physicalProducts_reservations_customer
  statusUpdatedAt: any | null
  reservationNumber: number
  shipped: boolean
  status: ReservationStatus
  shippedAt: any | null
  receivedAt: any | null
  createdAt: any
  phase: ReservationPhase
  images: GetPhysicalProducts_physicalProducts_reservations_images[]
  products: GetPhysicalProducts_physicalProducts_reservations_products[]
}

export interface GetPhysicalProducts_physicalProducts_warehouseLocation {
  __typename: "WarehouseLocation"
  id: string
  barcode: string
  locationCode: string
  itemCode: string
  type: WarehouseLocationType
}

export interface GetPhysicalProducts_physicalProducts_productVariant_internalSize {
  __typename: "Size"
  id: string
  display: string
}

export interface GetPhysicalProducts_physicalProducts_productVariant_product_category {
  __typename: "Category"
  id: string
  name: string
}

export interface GetPhysicalProducts_physicalProducts_productVariant_product_brand {
  __typename: "Brand"
  id: string
  name: string
}

export interface GetPhysicalProducts_physicalProducts_productVariant_product_materialCategory {
  __typename: "ProductMaterialCategory"
  id: string
  slug: string
}

export interface GetPhysicalProducts_physicalProducts_productVariant_product {
  __typename: "Product"
  id: string
  name: string
  publishedAt: any | null
  category: GetPhysicalProducts_physicalProducts_productVariant_product_category
  createdAt: any
  brand: GetPhysicalProducts_physicalProducts_productVariant_product_brand
  architecture: ProductArchitecture | null
  materialCategory: GetPhysicalProducts_physicalProducts_productVariant_product_materialCategory | null
  photographyStatus: PhotographyStatus | null
  status: ProductStatus | null
}

export interface GetPhysicalProducts_physicalProducts_productVariant {
  __typename: "ProductVariant"
  id: string
  sku: string | null
  internalSize: GetPhysicalProducts_physicalProducts_productVariant_internalSize | null
  retailPrice: number | null
  product: GetPhysicalProducts_physicalProducts_productVariant_product
}

export interface GetPhysicalProducts_physicalProducts {
  __typename: "PhysicalProduct"
  id: string
  seasonsUID: string
  inventoryStatus: InventoryStatus
  sequenceNumber: number
  unitCost: number | null
  dateOrdered: any | null
  dateReceived: any | null
  productStatus: PhysicalProductStatus
  createdAt: any
  barcoded: boolean
  barcode: string
  price: GetPhysicalProducts_physicalProducts_price | null
  reservations: GetPhysicalProducts_physicalProducts_reservations[]
  warehouseLocation: GetPhysicalProducts_physicalProducts_warehouseLocation | null
  productVariant: GetPhysicalProducts_physicalProducts_productVariant | null
}

export interface GetPhysicalProducts {
  physicalProducts: (GetPhysicalProducts_physicalProducts | null)[]
}
