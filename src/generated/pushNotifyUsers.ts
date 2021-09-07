/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerWhereInput, PushNotifDataInput } from "./globalTypes"

// ====================================================
// GraphQL mutation operation: pushNotifyUsers
// ====================================================

export interface pushNotifyUsers_pushNotifyUsers {
  __typename: "PushNotificationReceipt"
  id: string
}

export interface pushNotifyUsers {
  pushNotifyUsers: pushNotifyUsers_pushNotifyUsers | null
}

export interface pushNotifyUsersVariables {
  where: CustomerWhereInput
  data: PushNotifDataInput
}
