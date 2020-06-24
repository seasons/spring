/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserUpdateInput } from "./globalTypes"

// ====================================================
// GraphQL mutation operation: updateUser
// ====================================================

export interface updateUser_updateUser {
  __typename: "User"
  id: string
}

export interface updateUser {
  updateUser: updateUser_updateUser | null
}

export interface updateUserVariables {
  email: string
  data: UserUpdateInput
}
