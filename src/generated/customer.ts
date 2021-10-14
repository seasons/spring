/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  Plan,
  CustomerStatus,
  CustomerIOSAppStatus,
  BagItemStatus,
  UserRole,
  EmailId,
  InAdmissableReason,
  InvoiceStatus,
  CreditNoteReasonCode,
  CreditNoteStatus,
  ReservationStatus,
  ReservationLineItemRecordType,
} from "./globalTypes"

// ====================================================
// GraphQL fragment: customer
// ====================================================

export interface customer_bagItems_physicalProduct {
  __typename: "PhysicalProduct"
  id: string
}

export interface customer_bagItems_productVariant_internalSize {
  __typename: "Size"
  id: string
  display: string
}

export interface customer_bagItems_productVariant_product_images {
  __typename: "Image"
  id: string
  url: string | null
}

export interface customer_bagItems_productVariant_product_brand {
  __typename: "Brand"
  id: string
  name: string
}

export interface customer_bagItems_productVariant_product {
  __typename: "Product"
  id: string
  slug: string
  name: string
  images: customer_bagItems_productVariant_product_images[]
  brand: customer_bagItems_productVariant_product_brand
}

export interface customer_bagItems_productVariant {
  __typename: "ProductVariant"
  id: string
  sku: string | null
  displayShort: string | null
  internalSize: customer_bagItems_productVariant_internalSize | null
  product: customer_bagItems_productVariant_product
}

export interface customer_bagItems {
  __typename: "BagItem"
  id: string
  saved: boolean | null
  status: BagItemStatus
  isSwappable: boolean
  physicalProduct: customer_bagItems_physicalProduct | null
  productVariant: customer_bagItems_productVariant
}

export interface customer_user_links {
  __typename: "UserLinks"
  sendgrid: string
  mixpanel: string
  intercom: string
  chargebee: string
}

export interface customer_user_emails {
  __typename: "EmailReceipt"
  id: string
  emailId: EmailId
  createdAt: any
}

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
  links: customer_user_links | null
  emails: customer_user_emails[]
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

export interface customer_membership_plan {
  __typename: "PaymentPlan"
  id: string
  itemCount: number | null
  name: string | null
}

export interface customer_membership_subscription {
  __typename: "CustomerMembershipSubscriptionData"
  planPrice: number
}

export interface customer_membership_currentRentalInvoice {
  __typename: "RentalInvoice"
  id: string
  billingStartAt: any
  billingEndAt: any
  createdAt: any
  updatedAt: any
}

export interface customer_membership_pauseRequests_reason {
  __typename: "PauseReason"
  id: string
  reason: string
}

export interface customer_membership_pauseRequests {
  __typename: "PauseRequest"
  id: string
  resumeDate: any | null
  pauseDate: any | null
  reason: customer_membership_pauseRequests_reason | null
}

export interface customer_membership {
  __typename: "CustomerMembership"
  id: string
  creditBalance: number | null
  plan: customer_membership_plan | null
  subscription: customer_membership_subscription | null
  subscriptionId: string
  currentRentalInvoice: customer_membership_currentRentalInvoice | null
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

export interface customer_reservations_lineItems {
  __typename: "ReservationLineItem"
  id: string
  name: string | null
  price: number
  recordType: ReservationLineItemRecordType
}

export interface customer_reservations_sentPackage_items_productVariant_product_images {
  __typename: "Image"
  url: string | null
}

export interface customer_reservations_sentPackage_items_productVariant_product {
  __typename: "Product"
  id: string
  images: customer_reservations_sentPackage_items_productVariant_product_images[]
}

export interface customer_reservations_sentPackage_items_productVariant {
  __typename: "ProductVariant"
  id: string
  product: customer_reservations_sentPackage_items_productVariant_product
}

export interface customer_reservations_sentPackage_items {
  __typename: "PhysicalProduct"
  id: string
  productVariant: customer_reservations_sentPackage_items_productVariant | null
}

export interface customer_reservations_sentPackage {
  __typename: "Package"
  id: string
  items: customer_reservations_sentPackage_items[] | null
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
  productVariant: customer_reservations_products_productVariant | null
}

export interface customer_reservations_newProducts_productVariant_product_images {
  __typename: "Image"
  url: string | null
}

export interface customer_reservations_newProducts_productVariant_product {
  __typename: "Product"
  id: string
  images: customer_reservations_newProducts_productVariant_product_images[]
}

export interface customer_reservations_newProducts_productVariant {
  __typename: "ProductVariant"
  id: string
  product: customer_reservations_newProducts_productVariant_product
}

export interface customer_reservations_newProducts {
  __typename: "PhysicalProduct"
  id: string
  productVariant: customer_reservations_newProducts_productVariant | null
}

export interface customer_reservations {
  __typename: "Reservation"
  id: string
  reservationNumber: number
  shipped: boolean
  status: ReservationStatus
  shippedAt: any | null
  receivedAt: any | null
  createdAt: any
  lineItems: (customer_reservations_lineItems | null)[] | null
  sentPackage: customer_reservations_sentPackage | null
  products: customer_reservations_products[]
  newProducts: customer_reservations_newProducts[]
}

export interface customer_utm {
  __typename: "UTMData"
  id: string
  source: string | null
  medium: string | null
  campaign: string | null
  term: string | null
  content: string | null
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
  discoveryReference: string | null
  averagePantLength: string | null
  preferredPronouns: string | null
  profession: string | null
  partyFrequency: string | null
  travelFrequency: string | null
  shoppingFrequency: string | null
  averageSpend: string | null
  style: string | null
  commuteStyle: string | null
  instagramHandle: string | null
  shippingAddress: customer_detail_shippingAddress | null
}

export interface customer {
  __typename: "Customer"
  id: string
  plan: Plan | null
  status: CustomerStatus | null
  iOSAppStatus: CustomerIOSAppStatus | null
  bagItems: customer_bagItems[] | null
  user: customer_user
  admissions: customer_admissions | null
  membership: customer_membership | null
  invoices: (customer_invoices | null)[] | null
  reservations: customer_reservations[] | null
  utm: customer_utm | null
  billingInfo: customer_billingInfo | null
  detail: customer_detail | null
}
