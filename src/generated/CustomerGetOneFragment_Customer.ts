/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  Plan,
  CustomerStatus,
  CustomerIOSAppStatus,
  BagSectionStatus,
  BagItemStatus,
  WarehouseLocationType,
  ReservationPhysicalProductStatus,
  ReservationPhase,
  ShippingCode,
  PackageDirection,
  UserRole,
  EmailId,
  InAdmissableReason,
  RentalInvoiceLineItemType,
  RentalInvoiceStatus,
  InvoiceStatus,
  CreditNoteReasonCode,
  CreditNoteStatus,
  ReservationStatus,
  ReservationLineItemRecordType,
} from "./globalTypes"

// ====================================================
// GraphQL fragment: CustomerGetOneFragment_Customer
// ====================================================

export interface CustomerGetOneFragment_Customer_bagSections_bagItems_physicalProduct_price {
  __typename: "PhysicalProductPrice"
  id: string
  buyUsedPrice: number | null
  buyUsedEnabled: boolean
}

export interface CustomerGetOneFragment_Customer_bagSections_bagItems_physicalProduct_warehouseLocation {
  __typename: "WarehouseLocation"
  id: string
  type: WarehouseLocationType
  barcode: string
  locationCode: string
  itemCode: string
}

export interface CustomerGetOneFragment_Customer_bagSections_bagItems_physicalProduct {
  __typename: "PhysicalProduct"
  id: string
  barcode: string
  seasonsUID: string
  price: CustomerGetOneFragment_Customer_bagSections_bagItems_physicalProduct_price | null
  warehouseLocation: CustomerGetOneFragment_Customer_bagSections_bagItems_physicalProduct_warehouseLocation | null
}

export interface CustomerGetOneFragment_Customer_bagSections_bagItems_reservationPhysicalProduct_reservation_pickupWindow {
  __typename: "TimeWindow"
  display: string | null
}

export interface CustomerGetOneFragment_Customer_bagSections_bagItems_reservationPhysicalProduct_reservation {
  __typename: "Reservation"
  id: string
  pickupDate: any | null
  pickupWindow: CustomerGetOneFragment_Customer_bagSections_bagItems_reservationPhysicalProduct_reservation_pickupWindow | null
}

export interface CustomerGetOneFragment_Customer_bagSections_bagItems_reservationPhysicalProduct_shippingMethod {
  __typename: "ShippingMethod"
  id: string
  code: ShippingCode
}

export interface CustomerGetOneFragment_Customer_bagSections_bagItems_reservationPhysicalProduct_potentialInboundPackage_shippingLabel {
  __typename: "Label"
  id: string
  trackingNumber: string | null
  trackingURL: string | null
  image: string | null
}

export interface CustomerGetOneFragment_Customer_bagSections_bagItems_reservationPhysicalProduct_potentialInboundPackage {
  __typename: "Package"
  id: string
  direction: PackageDirection | null
  shippingLabel: CustomerGetOneFragment_Customer_bagSections_bagItems_reservationPhysicalProduct_potentialInboundPackage_shippingLabel
}

export interface CustomerGetOneFragment_Customer_bagSections_bagItems_reservationPhysicalProduct_outboundPackage_shippingLabel {
  __typename: "Label"
  id: string
  trackingNumber: string | null
  trackingURL: string | null
  image: string | null
}

export interface CustomerGetOneFragment_Customer_bagSections_bagItems_reservationPhysicalProduct_outboundPackage {
  __typename: "Package"
  id: string
  direction: PackageDirection | null
  shippingLabel: CustomerGetOneFragment_Customer_bagSections_bagItems_reservationPhysicalProduct_outboundPackage_shippingLabel
}

export interface CustomerGetOneFragment_Customer_bagSections_bagItems_reservationPhysicalProduct {
  __typename: "ReservationPhysicalProduct"
  id: string
  status: ReservationPhysicalProductStatus
  isOnHold: boolean | null
  lostInPhase: ReservationPhase | null
  reservation: CustomerGetOneFragment_Customer_bagSections_bagItems_reservationPhysicalProduct_reservation | null
  shippingMethod: CustomerGetOneFragment_Customer_bagSections_bagItems_reservationPhysicalProduct_shippingMethod | null
  potentialInboundPackage: CustomerGetOneFragment_Customer_bagSections_bagItems_reservationPhysicalProduct_potentialInboundPackage | null
  outboundPackage: CustomerGetOneFragment_Customer_bagSections_bagItems_reservationPhysicalProduct_outboundPackage | null
}

export interface CustomerGetOneFragment_Customer_bagSections_bagItems_productVariant_price {
  __typename: "ProductVariantPrice"
  id: string
  buyNewPrice: number | null
  buyNewEnabled: boolean
}

export interface CustomerGetOneFragment_Customer_bagSections_bagItems_productVariant_internalSize {
  __typename: "Size"
  id: string
  display: string
}

export interface CustomerGetOneFragment_Customer_bagSections_bagItems_productVariant_product_images {
  __typename: "Image"
  id: string
  url: string | null
}

export interface CustomerGetOneFragment_Customer_bagSections_bagItems_productVariant_product_brand {
  __typename: "Brand"
  id: string
  name: string
}

export interface CustomerGetOneFragment_Customer_bagSections_bagItems_productVariant_product {
  __typename: "Product"
  id: string
  slug: string
  name: string
  images: CustomerGetOneFragment_Customer_bagSections_bagItems_productVariant_product_images[]
  brand: CustomerGetOneFragment_Customer_bagSections_bagItems_productVariant_product_brand
}

export interface CustomerGetOneFragment_Customer_bagSections_bagItems_productVariant {
  __typename: "ProductVariant"
  id: string
  sku: string | null
  displayShort: string | null
  price: CustomerGetOneFragment_Customer_bagSections_bagItems_productVariant_price
  internalSize: CustomerGetOneFragment_Customer_bagSections_bagItems_productVariant_internalSize | null
  product: CustomerGetOneFragment_Customer_bagSections_bagItems_productVariant_product
}

export interface CustomerGetOneFragment_Customer_bagSections_bagItems {
  __typename: "BagItem"
  id: string
  saved: boolean | null
  status: BagItemStatus
  isSwappable: boolean
  physicalProduct: CustomerGetOneFragment_Customer_bagSections_bagItems_physicalProduct | null
  reservationPhysicalProduct: CustomerGetOneFragment_Customer_bagSections_bagItems_reservationPhysicalProduct | null
  productVariant: CustomerGetOneFragment_Customer_bagSections_bagItems_productVariant
}

export interface CustomerGetOneFragment_Customer_bagSections {
  __typename: "BagSection"
  id: string
  status: BagSectionStatus
  title: string
  deliveryTrackingUrl: string | null
  bagItems: CustomerGetOneFragment_Customer_bagSections_bagItems[] | null
}

export interface CustomerGetOneFragment_Customer_user_links {
  __typename: "UserLinks"
  sendgrid: string
  mixpanel: string
  intercom: string
  chargebee: string
}

export interface CustomerGetOneFragment_Customer_user_emails {
  __typename: "EmailReceipt"
  id: string
  emailId: EmailId
  createdAt: any
}

export interface CustomerGetOneFragment_Customer_user_pushNotification_history {
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

export interface CustomerGetOneFragment_Customer_user_pushNotification {
  __typename: "UserPushNotification"
  id: string
  history: CustomerGetOneFragment_Customer_user_pushNotification_history[] | null
}

export interface CustomerGetOneFragment_Customer_user {
  __typename: "User"
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  roles: UserRole[]
  createdAt: any
  links: CustomerGetOneFragment_Customer_user_links | null
  emails: CustomerGetOneFragment_Customer_user_emails[]
  pushNotification: CustomerGetOneFragment_Customer_user_pushNotification | null
}

export interface CustomerGetOneFragment_Customer_admissions {
  __typename: "CustomerAdmissionsData"
  id: string
  inServiceableZipcode: boolean
  admissable: boolean
  inAdmissableReason: InAdmissableReason | null
  authorizationsCount: number
}

export interface CustomerGetOneFragment_Customer_membership_creditUpdateHistory_adminUser {
  __typename: "User"
  firstName: string | null
  lastName: string | null
}

export interface CustomerGetOneFragment_Customer_membership_creditUpdateHistory {
  __typename: "CreditBalanceUpdateLog"
  id: string
  amount: number | null
  reason: string | null
  balance: number | null
  createdAt: any | null
  adminUser: CustomerGetOneFragment_Customer_membership_creditUpdateHistory_adminUser | null
}

export interface CustomerGetOneFragment_Customer_membership_plan {
  __typename: "PaymentPlan"
  id: string
  itemCount: number | null
  name: string | null
}

export interface CustomerGetOneFragment_Customer_membership_subscription {
  __typename: "CustomerMembershipSubscriptionData"
  id: string
  planPrice: number
}

export interface CustomerGetOneFragment_Customer_membership_currentRentalInvoice {
  __typename: "RentalInvoice"
  id: string
  billingStartAt: any
  billingEndAt: any
  createdAt: any
  updatedAt: any
}

export interface CustomerGetOneFragment_Customer_membership_financeMetrics_lineItems {
  __typename: "RentalInvoiceLineItem"
  daysRented: number | null
  rentalStartedAt: any | null
  rentalEndedAt: any | null
  price: number | null
  name: string | null
  type: RentalInvoiceLineItemType | null
}

export interface CustomerGetOneFragment_Customer_membership_financeMetrics {
  __typename: "FinanceMetric"
  id: string | null
  name: string | null
  amount: number | null
  lineItems: CustomerGetOneFragment_Customer_membership_financeMetrics_lineItems[] | null
}

export interface CustomerGetOneFragment_Customer_membership_rentalInvoices_lineItems_physicalProduct_productVariant_product {
  __typename: "Product"
  id: string
  name: string
}

export interface CustomerGetOneFragment_Customer_membership_rentalInvoices_lineItems_physicalProduct_productVariant {
  __typename: "ProductVariant"
  id: string
  product: CustomerGetOneFragment_Customer_membership_rentalInvoices_lineItems_physicalProduct_productVariant_product
}

export interface CustomerGetOneFragment_Customer_membership_rentalInvoices_lineItems_physicalProduct {
  __typename: "PhysicalProduct"
  id: string
  productVariant: CustomerGetOneFragment_Customer_membership_rentalInvoices_lineItems_physicalProduct_productVariant | null
}

export interface CustomerGetOneFragment_Customer_membership_rentalInvoices_lineItems {
  __typename: "RentalInvoiceLineItem"
  id: string
  daysRented: number | null
  rentalStartedAt: any | null
  rentalEndedAt: any | null
  price: number | null
  name: string | null
  type: RentalInvoiceLineItemType | null
  comment: string | null
  physicalProduct: CustomerGetOneFragment_Customer_membership_rentalInvoices_lineItems_physicalProduct | null
}

export interface CustomerGetOneFragment_Customer_membership_rentalInvoices {
  __typename: "RentalInvoice"
  id: string
  total: number | null
  lineItems: CustomerGetOneFragment_Customer_membership_rentalInvoices_lineItems[] | null
  billingStartAt: any
  billingEndAt: any
  status: RentalInvoiceStatus | null
  createdAt: any
  updatedAt: any
}

export interface CustomerGetOneFragment_Customer_membership_pauseRequests_reason {
  __typename: "PauseReason"
  id: string
  reason: string
}

export interface CustomerGetOneFragment_Customer_membership_pauseRequests {
  __typename: "PauseRequest"
  id: string
  resumeDate: any | null
  pauseDate: any | null
  reason: CustomerGetOneFragment_Customer_membership_pauseRequests_reason | null
}

export interface CustomerGetOneFragment_Customer_membership {
  __typename: "CustomerMembership"
  id: string
  creditBalance: number | null
  creditUpdateHistory: CustomerGetOneFragment_Customer_membership_creditUpdateHistory[] | null
  plan: CustomerGetOneFragment_Customer_membership_plan | null
  subscription: CustomerGetOneFragment_Customer_membership_subscription | null
  subscriptionId: string
  currentRentalInvoice: CustomerGetOneFragment_Customer_membership_currentRentalInvoice | null
  financeMetrics: (CustomerGetOneFragment_Customer_membership_financeMetrics | null)[] | null
  rentalInvoices: CustomerGetOneFragment_Customer_membership_rentalInvoices[] | null
  pauseRequests: CustomerGetOneFragment_Customer_membership_pauseRequests[] | null
}

export interface CustomerGetOneFragment_Customer_invoices_creditNotes {
  __typename: "CreditNote"
  id: string
  reasonCode: CreditNoteReasonCode | null
  date: any | null
  total: number | null
  status: CreditNoteStatus | null
}

export interface CustomerGetOneFragment_Customer_invoices {
  __typename: "Invoice"
  id: string
  subscriptionId: string | null
  recurring: boolean | null
  status: InvoiceStatus | null
  closingDate: any | null
  dueDate: any | null
  amount: number | null
  creditNotes: (CustomerGetOneFragment_Customer_invoices_creditNotes | null)[] | null
}

export interface CustomerGetOneFragment_Customer_reservations_lineItems {
  __typename: "ReservationLineItem"
  id: string
  name: string | null
  price: number
  recordType: ReservationLineItemRecordType
}

export interface CustomerGetOneFragment_Customer_reservations_sentPackage_items_productVariant_product_images {
  __typename: "Image"
  url: string | null
}

export interface CustomerGetOneFragment_Customer_reservations_sentPackage_items_productVariant_product {
  __typename: "Product"
  id: string
  images: CustomerGetOneFragment_Customer_reservations_sentPackage_items_productVariant_product_images[]
}

export interface CustomerGetOneFragment_Customer_reservations_sentPackage_items_productVariant {
  __typename: "ProductVariant"
  id: string
  product: CustomerGetOneFragment_Customer_reservations_sentPackage_items_productVariant_product
}

export interface CustomerGetOneFragment_Customer_reservations_sentPackage_items {
  __typename: "PhysicalProduct"
  id: string
  productVariant: CustomerGetOneFragment_Customer_reservations_sentPackage_items_productVariant | null
}

export interface CustomerGetOneFragment_Customer_reservations_sentPackage {
  __typename: "Package"
  id: string
  items: CustomerGetOneFragment_Customer_reservations_sentPackage_items[] | null
}

export interface CustomerGetOneFragment_Customer_reservations_products_productVariant_product_images {
  __typename: "Image"
  url: string | null
}

export interface CustomerGetOneFragment_Customer_reservations_products_productVariant_product {
  __typename: "Product"
  id: string
  images: CustomerGetOneFragment_Customer_reservations_products_productVariant_product_images[]
}

export interface CustomerGetOneFragment_Customer_reservations_products_productVariant {
  __typename: "ProductVariant"
  id: string
  product: CustomerGetOneFragment_Customer_reservations_products_productVariant_product
}

export interface CustomerGetOneFragment_Customer_reservations_products {
  __typename: "PhysicalProduct"
  id: string
  productVariant: CustomerGetOneFragment_Customer_reservations_products_productVariant | null
}

export interface CustomerGetOneFragment_Customer_reservations_newProducts_productVariant_product_images {
  __typename: "Image"
  url: string | null
}

export interface CustomerGetOneFragment_Customer_reservations_newProducts_productVariant_product {
  __typename: "Product"
  id: string
  images: CustomerGetOneFragment_Customer_reservations_newProducts_productVariant_product_images[]
}

export interface CustomerGetOneFragment_Customer_reservations_newProducts_productVariant {
  __typename: "ProductVariant"
  id: string
  product: CustomerGetOneFragment_Customer_reservations_newProducts_productVariant_product
}

export interface CustomerGetOneFragment_Customer_reservations_newProducts {
  __typename: "PhysicalProduct"
  id: string
  productVariant: CustomerGetOneFragment_Customer_reservations_newProducts_productVariant | null
}

export interface CustomerGetOneFragment_Customer_reservations {
  __typename: "Reservation"
  id: string
  reservationNumber: number
  shipped: boolean
  status: ReservationStatus
  shippedAt: any | null
  receivedAt: any | null
  createdAt: any
  lineItems: (CustomerGetOneFragment_Customer_reservations_lineItems | null)[] | null
  sentPackage: CustomerGetOneFragment_Customer_reservations_sentPackage | null
  products: CustomerGetOneFragment_Customer_reservations_products[]
  newProducts: CustomerGetOneFragment_Customer_reservations_newProducts[]
}

export interface CustomerGetOneFragment_Customer_utm {
  __typename: "UTMData"
  id: string
  source: string | null
  medium: string | null
  campaign: string | null
  term: string | null
  content: string | null
}

export interface CustomerGetOneFragment_Customer_billingInfo {
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

export interface CustomerGetOneFragment_Customer_detail_shippingAddress {
  __typename: "Location"
  id: string
  name: string | null
  address1: string | null
  address2: string | null
  city: string | null
  state: string | null
  zipCode: string
}

export interface CustomerGetOneFragment_Customer_detail {
  __typename: "CustomerDetail"
  id: string
  phoneNumber: string | null
  birthday: any | null
  height: number | null
  weight: number[]
  bodyType: string | null
  topSizes: string[]
  waistSizes: number[]
  pantLength: number | null
  shoeSize: number | null
  discoveryReference: string | null
  preferredPronouns: string | null
  profession: string | null
  partyFrequency: string | null
  travelFrequency: string | null
  shoppingFrequency: string | null
  averageSpend: string | null
  style: string | null
  commuteStyle: string | null
  instagramHandle: string | null
  shippingAddress: CustomerGetOneFragment_Customer_detail_shippingAddress | null
}

export interface CustomerGetOneFragment_Customer {
  __typename: "Customer"
  id: string
  plan: Plan | null
  status: CustomerStatus | null
  iOSAppStatus: CustomerIOSAppStatus | null
  bagSections: CustomerGetOneFragment_Customer_bagSections[] | null
  user: CustomerGetOneFragment_Customer_user
  admissions: CustomerGetOneFragment_Customer_admissions | null
  membership: CustomerGetOneFragment_Customer_membership | null
  invoices: (CustomerGetOneFragment_Customer_invoices | null)[] | null
  reservations: CustomerGetOneFragment_Customer_reservations[] | null
  utm: CustomerGetOneFragment_Customer_utm | null
  billingInfo: CustomerGetOneFragment_Customer_billingInfo | null
  detail: CustomerGetOneFragment_Customer_detail | null
}
