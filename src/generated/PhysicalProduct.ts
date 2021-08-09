/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  InventoryStatus,
  PhysicalProductOffloadMethod,
  PhysicalProductStatus,
  ReservationStatus,
  ReservationPhase,
  WarehouseLocationType,
  PhysicalProductDamageType,
  ProductArchitecture,
  PhotographyStatus,
  ProductStatus,
} from "./globalTypes"

// ====================================================
// GraphQL fragment: PhysicalProduct
// ====================================================

export interface PhysicalProduct_price {
  __typename: "PhysicalProductPrice"
  id: string
  buyUsedPrice: number | null
  buyUsedEnabled: boolean
}

export interface PhysicalProduct_reservations_customer_user {
  __typename: "User"
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface PhysicalProduct_reservations_customer {
  __typename: "Customer"
  id: string
  user: PhysicalProduct_reservations_customer_user
}

export interface PhysicalProduct_reservations_images {
  __typename: "Image"
  url: string | null
}

export interface PhysicalProduct_reservations_products {
  __typename: "PhysicalProduct"
  id: string
}

export interface PhysicalProduct_reservations {
  __typename: "Reservation"
  id: string
  customer: PhysicalProduct_reservations_customer
  statusUpdatedAt: any | null
  reservationNumber: number
  shipped: boolean
  status: ReservationStatus
  shippedAt: any | null
  receivedAt: any | null
  createdAt: any
  phase: ReservationPhase
  images: PhysicalProduct_reservations_images[]
  products: PhysicalProduct_reservations_products[]
}

export interface PhysicalProduct_warehouseLocation {
  __typename: "WarehouseLocation"
  id: string
  barcode: string
  locationCode: string
  itemCode: string
  type: WarehouseLocationType
}

export interface PhysicalProduct_reports_user {
  __typename: "User"
  id: string
  fullName: string
}

export interface PhysicalProduct_reports {
  __typename: "PhysicalProductQualityReport"
  id: string
  damageType: PhysicalProductDamageType | null
  createdAt: any
  notes: string | null
  user: PhysicalProduct_reports_user
}

export interface PhysicalProduct_productVariant_internalSize {
  __typename: "Size"
  id: string
  display: string
}

export interface PhysicalProduct_productVariant_product_category {
  __typename: "Category"
  id: string
  name: string
}

export interface PhysicalProduct_productVariant_product_brand {
  __typename: "Brand"
  id: string
  name: string
}

export interface PhysicalProduct_productVariant_product_materialCategory {
  __typename: "ProductMaterialCategory"
  id: string
  slug: string
}

export interface PhysicalProduct_productVariant_product {
  __typename: "Product"
  id: string
  name: string
  publishedAt: any | null
  category: PhysicalProduct_productVariant_product_category
  createdAt: any
  brand: PhysicalProduct_productVariant_product_brand
  architecture: ProductArchitecture | null
  materialCategory: PhysicalProduct_productVariant_product_materialCategory | null
  photographyStatus: PhotographyStatus | null
  status: ProductStatus | null
}

export interface PhysicalProduct_productVariant {
  __typename: "ProductVariant"
  id: string
  sku: string | null
  internalSize: PhysicalProduct_productVariant_internalSize | null
  retailPrice: number | null
  product: PhysicalProduct_productVariant_product
}

export interface PhysicalProduct {
  __typename: "PhysicalProduct"
  id: string
  seasonsUID: string
  inventoryStatus: InventoryStatus
  offloadMethod: PhysicalProductOffloadMethod | null
  sequenceNumber: number
  dateOrdered: any | null
  dateReceived: any | null
  productStatus: PhysicalProductStatus
  createdAt: any
  barcoded: boolean
  barcode: string
  price: PhysicalProduct_price | null
  reservations: PhysicalProduct_reservations[]
  warehouseLocation: PhysicalProduct_warehouseLocation | null
  reports: PhysicalProduct_reports[] | null
  productVariant: PhysicalProduct_productVariant | null
}
