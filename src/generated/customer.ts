/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Plan, CustomerStatus } from "./globalTypes"

// ====================================================
// GraphQL fragment: customer
// ====================================================

export interface customer_user {
  __typename: "User"
  id: string
  email: string
  firstName: string
  lastName: string
  completeAccountURL: string
}

export interface customer_detail_shippingAddress {
  __typename: "Location"
  id: string
  city: string
  state: string
}

export interface customer_detail {
  __typename: "CustomerDetail"
  id: string
  shippingAddress: customer_detail_shippingAddress | null
}

export interface customer_bagItems {
  __typename: "BagItem"
  id: string
}

export interface customer {
  __typename: "Customer"
  id: string
  user: customer_user
  detail: customer_detail | null
  bagItems: customer_bagItems[] | null
  plan: Plan | null
  status: CustomerStatus | null
}
