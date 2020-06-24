/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes"

// ====================================================
// GraphQL fragment: user
// ====================================================

export interface user {
  __typename: "User"
  id: string
  auth0Id: string
  email: string
  firstName: string
  lastName: string
  completeAccountURL: string
  roles: UserRole[]
  createdAt: any
  updatedAt: any
}
