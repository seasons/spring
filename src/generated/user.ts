/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { credit_balance_update_logs } from "./customer"
import { UserRole } from "./globalTypes"

// ====================================================
// GraphQL fragment: user
// ====================================================

export interface user_links {
  __typename: "UserLinks"
  mixpanel: string
  sendgrid: string
  intercom: string
}

export interface user {
  __typename: "User"
  id: string
  auth0Id: string
  email: string
  firstName: string
  lastName: string
  roles: UserRole[]
  createdAt: any
  updatedAt: any
  links: user_links | null
  creditUpdateHistory: credit_balance_update_logs
}
