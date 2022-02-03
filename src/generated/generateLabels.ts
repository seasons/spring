/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GenerateShippingLabelOptionsInput, PackageDirection } from "./globalTypes"

// ====================================================
// GraphQL mutation operation: generateLabels
// ====================================================

export interface generateLabels_generateShippingLabels_shippingLabel {
  __typename: "Label"
  id: string
  trackingNumber: string | null
  trackingURL: string | null
  image: string | null
}

export interface generateLabels_generateShippingLabels {
  __typename: "Package"
  id: string
  direction: PackageDirection | null
  shippingLabel: generateLabels_generateShippingLabels_shippingLabel
}

export interface generateLabels {
  generateShippingLabels: generateLabels_generateShippingLabels[] | null
}

export interface generateLabelsVariables {
  bagItemIds: string[]
  options?: GenerateShippingLabelOptionsInput | null
}
