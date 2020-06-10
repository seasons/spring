/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Plan, CustomerStatus, InvoiceStatus, CreditNoteReasonCode, CreditNoteStatus } from "./globalTypes"

// ====================================================
// GraphQL fragment: customer
// ====================================================

export interface customer_user_pushNotifications {
  __typename: "PushNotificationReceipt"
  id: string
  route: string | null
  screen: string | null
  uri: string | null
  interest: string | null
  body: string
  title: string | null
  sentAt: any
}

export interface customer_user {
  __typename: "User"
  id: string
  email: string
  firstName: string
  lastName: string
  createdAt: any
  pushNotifications: customer_user_pushNotifications[] | null
}

export interface customer_invoices_creditNotes {
  __typename: "CreditNote"
  id: string
  reasonCode: CreditNoteReasonCode | null
  date: any | null
  total: number | null
  status: CreditNoteStatus | null
}

export interface customer_invoices {
  __typename: "Invoice"
  id: string
  subscriptionId: string | null
  recurring: boolean | null
  status: InvoiceStatus | null
  closingDate: any | null
  dueDate: any | null
  amount: number | null
  creditNotes: (customer_invoices_creditNotes | null)[] | null
}

export interface customer_reservations_products_productVariant_product_images {
  __typename: "Image"
  url: string | null
}

export interface customer_reservations_products_productVariant_product {
  __typename: "Product"
  id: string
  images: customer_reservations_products_productVariant_product_images[]
}

export interface customer_reservations_products_productVariant {
  __typename: "ProductVariant"
  id: string
  product: customer_reservations_products_productVariant_product
}

export interface customer_reservations_products {
  __typename: "PhysicalProduct"
  id: string
  productVariant: customer_reservations_products_productVariant
}

export interface customer_reservations {
  __typename: "Reservation"
  id: string
  reservationNumber: number
  shipped: boolean
  status: string
  shippedAt: any | null
  receivedAt: any | null
  products: customer_reservations_products[]
}

export interface customer_billingInfo {
  __typename: "BillingInfo"
  id: string
  brand: string
  last_digits: string
  expiration_month: number
  expiration_year: number
  name: string | null
  street1: string | null
  city: string | null
  state: string | null
  postal_code: string | null
}

export interface customer_detail_shippingAddress {
  __typename: "Location"
  id: string
  name: string
  address1: string
  city: string
  state: string
  zipCode: string
}

export interface customer_detail {
  __typename: "CustomerDetail"
  id: string
  phoneNumber: string | null
  birthday: any | null
  height: number | null
  weight: string | null
  bodyType: string | null
  averageTopSize: string | null
  averageWaistSize: string | null
  averagePantLength: string | null
  preferredPronouns: string | null
  profession: string | null
  partyFrequency: string | null
  travelFrequency: string | null
  shoppingFrequency: string | null
  averageSpend: string | null
  style: string | null
  commuteStyle: string | null
  shippingAddress: customer_detail_shippingAddress | null
}

export interface customer {
  __typename: "Customer"
  id: string
  plan: Plan | null
  status: CustomerStatus | null
  user: customer_user
  invoices: (customer_invoices | null)[] | null
  reservations: customer_reservations[] | null
  billingInfo: customer_billingInfo | null
  detail: customer_detail | null
}
