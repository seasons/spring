/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CustomerUpdateInput } from "./globalTypes"

// ====================================================
// GraphQL mutation operation: updateCustomer
// ====================================================

export interface updateCustomer_updateCustomer {
  __typename: "Customer"
  id: string
}

export interface updateCustomer {
  updateCustomer: updateCustomer_updateCustomer | null
}

export interface updateCustomerVariables {
  id: string
  data: CustomerUpdateInput
}
