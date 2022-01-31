/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReservationPhysicalProductStatus } from "./globalTypes"

// ====================================================
// GraphQL query operation: InboundReservations
// ====================================================

export interface InboundReservations_inboundReservations_edges_node_customer_reservations {
  __typename: "Reservation"
  id: string
}

export interface InboundReservations_inboundReservations_edges_node_customer_detail_shippingAddress {
  __typename: "Location"
  id: string
  city: string | null
  state: string | null
}

export interface InboundReservations_inboundReservations_edges_node_customer_detail {
  __typename: "CustomerDetail"
  id: string
  shippingAddress: InboundReservations_inboundReservations_edges_node_customer_detail_shippingAddress | null
}

export interface InboundReservations_inboundReservations_edges_node_customer_user {
  __typename: "User"
  id: string
  firstName: string | null
  lastName: string | null
}

export interface InboundReservations_inboundReservations_edges_node_customer_reservationPhysicalProducts_physicalProduct_productVariant_product_images {
  __typename: "Image"
  id: string
  url: string | null
}

export interface InboundReservations_inboundReservations_edges_node_customer_reservationPhysicalProducts_physicalProduct_productVariant_product {
  __typename: "Product"
  id: string
  images: InboundReservations_inboundReservations_edges_node_customer_reservationPhysicalProducts_physicalProduct_productVariant_product_images[]
}

export interface InboundReservations_inboundReservations_edges_node_customer_reservationPhysicalProducts_physicalProduct_productVariant {
  __typename: "ProductVariant"
  id: string
  product: InboundReservations_inboundReservations_edges_node_customer_reservationPhysicalProducts_physicalProduct_productVariant_product
}

export interface InboundReservations_inboundReservations_edges_node_customer_reservationPhysicalProducts_physicalProduct {
  __typename: "PhysicalProduct"
  id: string
  productVariant: InboundReservations_inboundReservations_edges_node_customer_reservationPhysicalProducts_physicalProduct_productVariant | null
}

export interface InboundReservations_inboundReservations_edges_node_customer_reservationPhysicalProducts {
  __typename: "ReservationPhysicalProduct"
  id: string
  status: ReservationPhysicalProductStatus
  physicalProduct: InboundReservations_inboundReservations_edges_node_customer_reservationPhysicalProducts_physicalProduct | null
  createdAt: any | null
}

export interface InboundReservations_inboundReservations_edges_node_customer {
  __typename: "Customer"
  id: string
  reservations: InboundReservations_inboundReservations_edges_node_customer_reservations[] | null
  detail: InboundReservations_inboundReservations_edges_node_customer_detail | null
  user: InboundReservations_inboundReservations_edges_node_customer_user
  reservationPhysicalProducts:
    | (InboundReservations_inboundReservations_edges_node_customer_reservationPhysicalProducts | null)[]
    | null
}

export interface InboundReservations_inboundReservations_edges_node {
  __typename: "ReservationPhysicalProduct"
  id: string
  customer: InboundReservations_inboundReservations_edges_node_customer
}

export interface InboundReservations_inboundReservations_edges {
  __typename: "ReservationPhysicalProductEdge"
  node: InboundReservations_inboundReservations_edges_node
}

export interface InboundReservations_inboundReservations {
  __typename: "ReservationPhysicalProductConnection"
  totalCount: number
  edges: (InboundReservations_inboundReservations_edges | null)[]
}

export interface InboundReservations_reservationProcessingStats {
  __typename: "ReservationProcessingStats"
  currentNumQueuedItems: number
  currentNumQueuedReservations: number
  currentNumDeliveredToBusinessItems: number
  day: any | null
  updatedAt: any | null
}

export interface InboundReservations {
  inboundReservations: InboundReservations_inboundReservations
  reservationProcessingStats: InboundReservations_reservationProcessingStats
}

export interface InboundReservationsVariables {
  take: number
  skip: number
}
