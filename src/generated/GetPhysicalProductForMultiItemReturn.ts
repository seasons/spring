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
// GraphQL query operation: GetPhysicalProductForMultiItemReturn
// ====================================================

export interface GetPhysicalProductForMultiItemReturn_physicalProducts_price {
  __typename: "PhysicalProductPrice"
  id: string
  buyUsedPrice: number | null
  buyUsedEnabled: boolean
}

export interface GetPhysicalProductForMultiItemReturn_physicalProducts_reservations_customer_user {
  __typename: "User"
  id: string
  firstName: string | null
  lastName: string | null
  email: string
}

export interface GetPhysicalProductForMultiItemReturn_physicalProducts_reservations_customer {
  __typename: "Customer"
  id: string
  user: GetPhysicalProductForMultiItemReturn_physicalProducts_reservations_customer_user
}

export interface GetPhysicalProductForMultiItemReturn_physicalProducts_reservations_images {
  __typename: "Image"
  url: string | null
}

export interface GetPhysicalProductForMultiItemReturn_physicalProducts_reservations_products {
  __typename: "PhysicalProduct"
  id: string
}

export interface GetPhysicalProductForMultiItemReturn_physicalProducts_reservations {
  __typename: "Reservation"
  id: string
  customer: GetPhysicalProductForMultiItemReturn_physicalProducts_reservations_customer
  statusUpdatedAt: any | null
  reservationNumber: number
  shipped: boolean
  status: ReservationStatus
  shippedAt: any | null
  receivedAt: any | null
  createdAt: any
  phase: ReservationPhase
  images: GetPhysicalProductForMultiItemReturn_physicalProducts_reservations_images[]
  products: GetPhysicalProductForMultiItemReturn_physicalProducts_reservations_products[]
}

export interface GetPhysicalProductForMultiItemReturn_physicalProducts_warehouseLocation {
  __typename: "WarehouseLocation"
  id: string
  barcode: string
  locationCode: string
  itemCode: string
  type: WarehouseLocationType
}

export interface GetPhysicalProductForMultiItemReturn_physicalProducts_reports_user {
  __typename: "User"
  id: string
  fullName: string
}

export interface GetPhysicalProductForMultiItemReturn_physicalProducts_reports {
  __typename: "PhysicalProductQualityReport"
  id: string
  damageType: PhysicalProductDamageType | null
  createdAt: any
  notes: string | null
  user: GetPhysicalProductForMultiItemReturn_physicalProducts_reports_user
}

export interface GetPhysicalProductForMultiItemReturn_physicalProducts_productVariant_internalSize {
  __typename: "Size"
  id: string
  display: string
}

export interface GetPhysicalProductForMultiItemReturn_physicalProducts_productVariant_product_category {
  __typename: "Category"
  id: string
  name: string
}

export interface GetPhysicalProductForMultiItemReturn_physicalProducts_productVariant_product_brand {
  __typename: "Brand"
  id: string
  name: string
}

export interface GetPhysicalProductForMultiItemReturn_physicalProducts_productVariant_product_images {
  __typename: "Image"
  id: string
  url: string | null
}

export interface GetPhysicalProductForMultiItemReturn_physicalProducts_productVariant_product_materialCategory {
  __typename: "ProductMaterialCategory"
  id: string
  slug: string
}

export interface GetPhysicalProductForMultiItemReturn_physicalProducts_productVariant_product {
  __typename: "Product"
  id: string
  name: string
  publishedAt: any | null
  category: GetPhysicalProductForMultiItemReturn_physicalProducts_productVariant_product_category
  createdAt: any
  brand: GetPhysicalProductForMultiItemReturn_physicalProducts_productVariant_product_brand
  images: GetPhysicalProductForMultiItemReturn_physicalProducts_productVariant_product_images[]
  architecture: ProductArchitecture | null
  materialCategory: GetPhysicalProductForMultiItemReturn_physicalProducts_productVariant_product_materialCategory | null
  photographyStatus: PhotographyStatus | null
  status: ProductStatus | null
}

export interface GetPhysicalProductForMultiItemReturn_physicalProducts_productVariant {
  __typename: "ProductVariant"
  id: string
  sku: string | null
  internalSize: GetPhysicalProductForMultiItemReturn_physicalProducts_productVariant_internalSize | null
  retailPrice: number | null
  product: GetPhysicalProductForMultiItemReturn_physicalProducts_productVariant_product
}

export interface GetPhysicalProductForMultiItemReturn_physicalProducts {
  __typename: "PhysicalProduct"
  id: string
  seasonsUID: string
  inventoryStatus: InventoryStatus
  offloadMethod: PhysicalProductOffloadMethod | null
  sequenceNumber: number
  unitCost: number | null
  dateOrdered: any | null
  dateReceived: any | null
  productStatus: PhysicalProductStatus
  createdAt: any
  barcoded: boolean
  barcode: string
  price: GetPhysicalProductForMultiItemReturn_physicalProducts_price | null
  reservations: GetPhysicalProductForMultiItemReturn_physicalProducts_reservations[]
  warehouseLocation: GetPhysicalProductForMultiItemReturn_physicalProducts_warehouseLocation | null
  reports: GetPhysicalProductForMultiItemReturn_physicalProducts_reports[] | null
  productVariant: GetPhysicalProductForMultiItemReturn_physicalProducts_productVariant | null
}

export interface GetPhysicalProductForMultiItemReturn {
  physicalProducts: (GetPhysicalProductForMultiItemReturn_physicalProducts | null)[]
}

export interface GetPhysicalProductForMultiItemReturnVariables {
  sequenceNumber?: number | null
}
