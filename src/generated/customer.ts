/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  Plan,
  CustomerStatus,
  UserRole,
  InAdmissableReason,
  InvoiceStatus,
  CreditNoteReasonCode,
  CreditNoteStatus,
  ReservationStatus,
} from "./globalTypes"

// ====================================================
// GraphQL fragment: customer
// ====================================================

export interface customer_user_pushNotification_history {
  __typename: "PushNotificationReceipt"
  id: string
  title: string | null
  body: string
  route: string | null
  screen: string | null
  uri: string | null
  sentAt: any
  interest: string | null
}

export interface customer_user_pushNotification {
  __typename: "UserPushNotification"
  id: string
  history: customer_user_pushNotification_history[] | null
}

export interface customer_user {
  __typename: "User"
  id: string
  email: string
  firstName: string
  lastName: string
  roles: UserRole[]
  createdAt: any
  pushNotification: customer_user_pushNotification | null
}

export interface customer_admissions {
  __typename: "CustomerAdmissionsData"
  id: string
  inServiceableZipcode: boolean
  admissable: boolean
  inAdmissableReason: InAdmissableReason | null
  authorizationsCount: number
}

export interface customer_membership_pauseRequests {
  __typename: "PauseRequest"
  id: string
  resumeDate: any | null
  pauseDate: any | null
}

export interface customer_membership {
  __typename: "CustomerMembership"
  id: string
  pauseRequests: customer_membership_pauseRequests[] | null
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
  status: ReservationStatus
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
  street2: string | null
  city: string | null
  state: string | null
  postal_code: string | null
}

export interface customer_detail_shippingAddress {
  __typename: "Location"
  id: string
  name: string | null
  address1: string | null
  address2: string | null
  city: string | null
  state: string | null
  zipCode: string
}

export interface customer_detail {
  __typename: "CustomerDetail"
  id: string
  phoneNumber: string | null
  birthday: any | null
  height: number | null
  weight: number[]
  bodyType: string | null
  topSizes: string[]
  waistSizes: number[]
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
  admissions: customer_admissions | null
  membership: customer_membership | null
  invoices: (customer_invoices | null)[] | null
  reservations: customer_reservations[] | null
  billingInfo: customer_billingInfo | null
  detail: customer_detail | null
}
