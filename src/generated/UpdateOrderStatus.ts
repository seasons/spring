/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes"

// ====================================================
// GraphQL mutation operation: UpdateOrderStatus
// ====================================================

export interface UpdateOrderStatus_updateOrderStatus {
  __typename: "Order"
  id: string
  status: OrderStatus
}

export interface UpdateOrderStatus {
  updateOrderStatus: UpdateOrderStatus_updateOrderStatus
}

export interface UpdateOrderStatusVariables {
  orderID: string
  status: OrderStatus
}
