/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Plan, CustomerStatus, InAdmissableReason } from "./globalTypes"

// ====================================================
// GraphQL fragment: CustomerGetListFragment_Customer
// ====================================================

export interface CustomerGetListFragment_Customer_membership_plan {
  __typename: "PaymentPlan"
  id: string
  planID: string
}

export interface CustomerGetListFragment_Customer_membership {
  __typename: "CustomerMembership"
  id: string
  plan: CustomerGetListFragment_Customer_membership_plan | null
}

export interface CustomerGetListFragment_Customer_user_links {
  __typename: "UserLinks"
  sendgrid: string
  mixpanel: string
  intercom: string
}

export interface CustomerGetListFragment_Customer_user {
  __typename: "User"
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  links: CustomerGetListFragment_Customer_user_links | null
}

export interface CustomerGetListFragment_Customer_detail_shippingAddress {
  __typename: "Location"
  id: string
  city: string | null
  state: string | null
}

export interface CustomerGetListFragment_Customer_detail {
  __typename: "CustomerDetail"
  id: string
  shippingAddress: CustomerGetListFragment_Customer_detail_shippingAddress | null
}

export interface CustomerGetListFragment_Customer_bagItems {
  __typename: "BagItem"
  id: string
}

export interface CustomerGetListFragment_Customer_admissions {
  __typename: "CustomerAdmissionsData"
  id: string
  inServiceableZipcode: boolean
  admissable: boolean
  inAdmissableReason: InAdmissableReason | null
  authorizationsCount: number
}

export interface CustomerGetListFragment_Customer {
  __typename: "Customer"
  id: string
  plan: Plan | null
  status: CustomerStatus | null
  membership: CustomerGetListFragment_Customer_membership | null
  user: CustomerGetListFragment_Customer_user
  detail: CustomerGetListFragment_Customer_detail | null
  bagItems: CustomerGetListFragment_Customer_bagItems[] | null
  admissions: CustomerGetListFragment_Customer_admissions | null
}
