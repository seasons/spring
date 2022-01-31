/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReservationPhysicalProductStatus } from "./globalTypes"

// ====================================================
// GraphQL query operation: OutboundReservations
// ====================================================

export interface OutboundReservations_outboundReservations_edges_node_customer_reservations {
  __typename: "Reservation"
  id: string
}

export interface OutboundReservations_outboundReservations_edges_node_customer_detail_shippingAddress {
  __typename: "Location"
  id: string
  city: string | null
  state: string | null
}

export interface OutboundReservations_outboundReservations_edges_node_customer_detail {
  __typename: "CustomerDetail"
  id: string
  shippingAddress: OutboundReservations_outboundReservations_edges_node_customer_detail_shippingAddress | null
}

export interface OutboundReservations_outboundReservations_edges_node_customer_user {
  __typename: "User"
  id: string
  firstName: string | null
  lastName: string | null
}

export interface OutboundReservations_outboundReservations_edges_node_customer_reservationPhysicalProducts_physicalProduct_productVariant_product_images {
  __typename: "Image"
  id: string
  url: string | null
}

export interface OutboundReservations_outboundReservations_edges_node_customer_reservationPhysicalProducts_physicalProduct_productVariant_product {
  __typename: "Product"
  id: string
  images: OutboundReservations_outboundReservations_edges_node_customer_reservationPhysicalProducts_physicalProduct_productVariant_product_images[]
}

export interface OutboundReservations_outboundReservations_edges_node_customer_reservationPhysicalProducts_physicalProduct_productVariant {
  __typename: "ProductVariant"
  id: string
  product: OutboundReservations_outboundReservations_edges_node_customer_reservationPhysicalProducts_physicalProduct_productVariant_product
}

export interface OutboundReservations_outboundReservations_edges_node_customer_reservationPhysicalProducts_physicalProduct {
  __typename: "PhysicalProduct"
  id: string
  productVariant: OutboundReservations_outboundReservations_edges_node_customer_reservationPhysicalProducts_physicalProduct_productVariant | null
}

export interface OutboundReservations_outboundReservations_edges_node_customer_reservationPhysicalProducts {
  __typename: "ReservationPhysicalProduct"
  id: string
  status: ReservationPhysicalProductStatus
  physicalProduct: OutboundReservations_outboundReservations_edges_node_customer_reservationPhysicalProducts_physicalProduct | null
  createdAt: any | null
}

export interface OutboundReservations_outboundReservations_edges_node_customer {
  __typename: "Customer"
  id: string
  reservations: OutboundReservations_outboundReservations_edges_node_customer_reservations[] | null
  detail: OutboundReservations_outboundReservations_edges_node_customer_detail | null
  user: OutboundReservations_outboundReservations_edges_node_customer_user
  reservationPhysicalProducts:
    | (OutboundReservations_outboundReservations_edges_node_customer_reservationPhysicalProducts | null)[]
    | null
}

export interface OutboundReservations_outboundReservations_edges_node {
  __typename: "ReservationPhysicalProduct"
  id: string
  customer: OutboundReservations_outboundReservations_edges_node_customer
}

export interface OutboundReservations_outboundReservations_edges {
  __typename: "ReservationPhysicalProductEdge"
  node: OutboundReservations_outboundReservations_edges_node
}

export interface OutboundReservations_outboundReservations {
  __typename: "ReservationPhysicalProductConnection"
  totalCount: number
  edges: (OutboundReservations_outboundReservations_edges | null)[]
}

export interface OutboundReservations_reservationProcessingStats {
  __typename: "ReservationProcessingStats"
  currentNumQueuedItems: number
  currentNumQueuedReservations: number
  currentNumDeliveredToBusinessItems: number
  day: any | null
  updatedAt: any | null
}

export interface OutboundReservations {
  outboundReservations: OutboundReservations_outboundReservations
  reservationProcessingStats: OutboundReservations_reservationProcessingStats
}

export interface OutboundReservationsVariables {
  take: number
  skip: number
}
