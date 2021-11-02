/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderType, OrderLineItemRecordType, OrderStatus } from "./globalTypes"

// ====================================================
// GraphQL fragment: Order
// ====================================================

export interface Order_customer_user {
  __typename: "User"
  id: string
  fullName: string
  email: string
}

export interface Order_customer_detail_shippingAddress {
  __typename: "Location"
  id: string
  name: string | null
  address1: string | null
  address2: string | null
  city: string | null
  state: string | null
}

export interface Order_customer_detail {
  __typename: "CustomerDetail"
  id: string
  shippingAddress: Order_customer_detail_shippingAddress | null
}

export interface Order_customer {
  __typename: "Customer"
  id: string
  user: Order_customer_user
  detail: Order_customer_detail | null
}

export interface Order_sentPackage_shippingLabel {
  __typename: "Label"
  id: string
  image: string | null
  trackingNumber: string | null
  trackingURL: string | null
}

export interface Order_sentPackage {
  __typename: "Package"
  id: string
  shippingLabel: Order_sentPackage_shippingLabel
  weight: number | null
}

export interface Order_lineItems_physicalProduct_warehouseLocation {
  __typename: "WarehouseLocation"
  id: string
  barcode: string
}

export interface Order_lineItems_physicalProduct_productVariant_color {
  __typename: "Color"
  id: string
  name: string
}

export interface Order_lineItems_physicalProduct_productVariant_product_images {
  __typename: "Image"
  url: string | null
}

export interface Order_lineItems_physicalProduct_productVariant_product_brand {
  __typename: "Brand"
  id: string
  name: string
}

export interface Order_lineItems_physicalProduct_productVariant_product {
  __typename: "Product"
  id: string
  name: string
  slug: string
  images: Order_lineItems_physicalProduct_productVariant_product_images[]
  brand: Order_lineItems_physicalProduct_productVariant_product_brand
}

export interface Order_lineItems_physicalProduct_productVariant {
  __typename: "ProductVariant"
  id: string
  sku: string | null
  displayLong: string | null
  color: Order_lineItems_physicalProduct_productVariant_color
  product: Order_lineItems_physicalProduct_productVariant_product
}

export interface Order_lineItems_physicalProduct {
  __typename: "PhysicalProduct"
  id: string
  seasonsUID: string
  warehouseLocation: Order_lineItems_physicalProduct_warehouseLocation | null
  productVariant: Order_lineItems_physicalProduct_productVariant | null
}

export interface Order_lineItems {
  __typename: "OrderLineItem"
  id: string
  recordID: string | null
  recordType: OrderLineItemRecordType
  needShipping: boolean | null
  taxRate: number | null
  taxName: string | null
  taxPercentage: number | null
  taxPrice: number | null
  price: number
  currencyCode: string
  createdAt: any
  physicalProduct: Order_lineItems_physicalProduct | null
}

export interface Order {
  __typename: "Order"
  id: string
  orderNumber: string
  customer: Order_customer
  sentPackage: Order_sentPackage | null
  type: OrderType
  lineItems: Order_lineItems[] | null
  subTotal: number | null
  total: number | null
  status: OrderStatus
  note: string | null
  createdAt: any
  updatedAt: any
}
