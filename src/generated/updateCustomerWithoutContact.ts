/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerUpdateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateCustomerWithoutContact
// ====================================================

export interface updateCustomerWithoutContact_updateCustomer {
  __typename: "Customer";
  id: string;
}

export interface updateCustomerWithoutContact {
  updateCustomer: updateCustomerWithoutContact_updateCustomer | null;
}

export interface updateCustomerWithoutContactVariables {
  id: string;
  data: CustomerUpdateInput;
}
