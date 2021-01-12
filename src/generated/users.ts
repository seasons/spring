/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: users
// ====================================================

export interface users_users_customer {
  __typename: "Customer";
  status: CustomerStatus | null;
}

export interface users_users {
  __typename: "User";
  fullName: string;
  email: string;
  customer: users_users_customer | null;
}

export interface users {
  users: (users_users | null)[];
}
