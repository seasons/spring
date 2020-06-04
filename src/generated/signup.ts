/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerDetailCreateInput } from "./globalTypes"

// ====================================================
// GraphQL mutation operation: signup
// ====================================================

export interface signup_signup_customer {
  __typename: "Customer"
  id: string
}

export interface signup_signup {
  __typename: "AuthPayload"
  customer: signup_signup_customer
}

export interface signup {
  signup: signup_signup
}

export interface signupVariables {
  email: string
  password: string
  firstName: string
  lastName: string
  details: CustomerDetailCreateInput
}
