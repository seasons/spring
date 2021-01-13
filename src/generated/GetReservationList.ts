/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReservationPhase, ReservationStatus } from "./globalTypes"

// ====================================================
// GraphQL fragment: GetReservationList
// ====================================================

export interface GetReservationList_customer_user {
  __typename: "User"
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface GetReservationList_customer {
  __typename: "Customer"
  id: string
  user: GetReservationList_customer_user
}

export interface GetReservationList_images {
  __typename: "Image"
  url: string | null
}

export interface GetReservationList {
  __typename: "Reservation"
  id: string
  customer: GetReservationList_customer
  images: GetReservationList_images[]
  phase: ReservationPhase
  reservationNumber: number
  shipped: boolean
  status: ReservationStatus
  shippedAt: any | null
  statusUpdatedAt: any | null
  returnAt: any | null
  createdAt: any
}
