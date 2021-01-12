/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PushNotifDataInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: pushNotifyUser
// ====================================================

export interface pushNotifyUser_pushNotifyUser {
  __typename: "PushNotificationReceipt";
  id: string;
}

export interface pushNotifyUser {
  pushNotifyUser: pushNotifyUser_pushNotifyUser | null;
}

export interface pushNotifyUserVariables {
  email: string;
  data: PushNotifDataInput;
}
