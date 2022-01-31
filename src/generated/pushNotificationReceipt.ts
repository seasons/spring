/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: pushNotificationReceipt
// ====================================================

export interface pushNotificationReceipt_users_customer {
  __typename: "Customer"
  id: string
}

export interface pushNotificationReceipt_users {
  __typename: "User"
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  fullName: string
  customer: pushNotificationReceipt_users_customer | null
}

export interface pushNotificationReceipt {
  __typename: "PushNotificationReceipt"
  id: string
  title: string | null
  body: string
  route: string | null
  screen: string | null
  interest: string | null
  sentAt: any
  uri: string | null
  users: pushNotificationReceipt_users[] | null
}
