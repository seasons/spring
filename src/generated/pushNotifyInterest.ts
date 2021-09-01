/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PushNotificationInterest, PushNotifDataInput } from "./globalTypes"

// ====================================================
// GraphQL mutation operation: pushNotifyInterest
// ====================================================

export interface pushNotifyInterest_pushNotifyInterest {
  __typename: "PushNotificationReceipt"
  id: string
}

export interface pushNotifyInterest {
  pushNotifyInterest: pushNotifyInterest_pushNotifyInterest | null
}

export interface pushNotifyInterestVariables {
  interest?: PushNotificationInterest | null
  data: PushNotifDataInput
}
