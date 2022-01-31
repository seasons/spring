/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReservationPhysicalProductWhereUniqueInput, ReservationPhysicalProductUpdateInput } from "./globalTypes"

// ====================================================
// GraphQL mutation operation: UpdateReservationPhysicalProduct
// ====================================================

export interface UpdateReservationPhysicalProduct_updateReservationPhysicalProduct {
  __typename: "ReservationPhysicalProduct"
  id: string
}

export interface UpdateReservationPhysicalProduct {
  updateReservationPhysicalProduct: UpdateReservationPhysicalProduct_updateReservationPhysicalProduct
}

export interface UpdateReservationPhysicalProductVariables {
  where: ReservationPhysicalProductWhereUniqueInput
  data: ReservationPhysicalProductUpdateInput
}
