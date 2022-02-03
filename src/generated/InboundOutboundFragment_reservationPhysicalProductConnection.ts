/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReservationPhysicalProductStatus } from "./globalTypes"

// ====================================================
// GraphQL fragment: InboundOutboundFragment_reservationPhysicalProductConnection
// ====================================================

export interface InboundOutboundFragment_reservationPhysicalProductConnection_edges_node_customer_reservations {
  __typename: "Reservation"
  id: string
}

export interface InboundOutboundFragment_reservationPhysicalProductConnection_edges_node_customer_detail_shippingAddress {
  __typename: "Location"
  id: string
  city: string | null
  state: string | null
}

export interface InboundOutboundFragment_reservationPhysicalProductConnection_edges_node_customer_detail {
  __typename: "CustomerDetail"
  id: string
  shippingAddress: InboundOutboundFragment_reservationPhysicalProductConnection_edges_node_customer_detail_shippingAddress | null
}

export interface InboundOutboundFragment_reservationPhysicalProductConnection_edges_node_customer_user {
  __typename: "User"
  id: string
  firstName: string | null
  lastName: string | null
}

export interface InboundOutboundFragment_reservationPhysicalProductConnection_edges_node_customer_reservationPhysicalProducts_physicalProduct_productVariant_product_images {
  __typename: "Image"
  id: string
  url: string | null
}

export interface InboundOutboundFragment_reservationPhysicalProductConnection_edges_node_customer_reservationPhysicalProducts_physicalProduct_productVariant_product {
  __typename: "Product"
  id: string
  images: InboundOutboundFragment_reservationPhysicalProductConnection_edges_node_customer_reservationPhysicalProducts_physicalProduct_productVariant_product_images[]
}

export interface InboundOutboundFragment_reservationPhysicalProductConnection_edges_node_customer_reservationPhysicalProducts_physicalProduct_productVariant {
  __typename: "ProductVariant"
  id: string
  product: InboundOutboundFragment_reservationPhysicalProductConnection_edges_node_customer_reservationPhysicalProducts_physicalProduct_productVariant_product
}

export interface InboundOutboundFragment_reservationPhysicalProductConnection_edges_node_customer_reservationPhysicalProducts_physicalProduct {
  __typename: "PhysicalProduct"
  id: string
  productVariant: InboundOutboundFragment_reservationPhysicalProductConnection_edges_node_customer_reservationPhysicalProducts_physicalProduct_productVariant | null
}

export interface InboundOutboundFragment_reservationPhysicalProductConnection_edges_node_customer_reservationPhysicalProducts {
  __typename: "ReservationPhysicalProduct"
  id: string
  status: ReservationPhysicalProductStatus
  physicalProduct: InboundOutboundFragment_reservationPhysicalProductConnection_edges_node_customer_reservationPhysicalProducts_physicalProduct | null
  createdAt: any | null
}

export interface InboundOutboundFragment_reservationPhysicalProductConnection_edges_node_customer {
  __typename: "Customer"
  id: string
  reservations: InboundOutboundFragment_reservationPhysicalProductConnection_edges_node_customer_reservations[] | null
  detail: InboundOutboundFragment_reservationPhysicalProductConnection_edges_node_customer_detail | null
  user: InboundOutboundFragment_reservationPhysicalProductConnection_edges_node_customer_user
  reservationPhysicalProducts:
    | (InboundOutboundFragment_reservationPhysicalProductConnection_edges_node_customer_reservationPhysicalProducts | null)[]
    | null
}

export interface InboundOutboundFragment_reservationPhysicalProductConnection_edges_node {
  __typename: "ReservationPhysicalProduct"
  id: string
  customer: InboundOutboundFragment_reservationPhysicalProductConnection_edges_node_customer
}

export interface InboundOutboundFragment_reservationPhysicalProductConnection_edges {
  __typename: "ReservationPhysicalProductEdge"
  node: InboundOutboundFragment_reservationPhysicalProductConnection_edges_node
}

export interface InboundOutboundFragment_reservationPhysicalProductConnection {
  __typename: "ReservationPhysicalProductConnection"
  totalCount: number
  edges: (InboundOutboundFragment_reservationPhysicalProductConnection_edges | null)[]
}
