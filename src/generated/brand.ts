/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BrandTier } from "./globalTypes";

// ====================================================
// GraphQL fragment: brand
// ====================================================

export interface brand {
  __typename: "Brand";
  id: string;
  name: string;
  tier: BrandTier;
  brandCode: string;
  createdAt: any;
  updatedAt: any;
}
