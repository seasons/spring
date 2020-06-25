/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserUpdateInput } from "./globalTypes"

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser {
  __typename: "User"
  id: string
}

export interface UpdateUser {
  updateUser: UpdateUser_updateUser | null
}

export interface UpdateUserVariables {
  email: string
  data: UserUpdateInput
}
