/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Package
// ====================================================

export interface Package_items {
  __typename: "PhysicalProduct";
  id: string;
  seasonsUID: string;
}

export interface Package_shippingLabel {
  __typename: "Label";
  id: string;
}

export interface Package_fromAddress {
  __typename: "Location";
  id: string;
}

export interface Package_toAddress {
  __typename: "Location";
  id: string;
}

export interface Package {
  __typename: "Package";
  id: string;
  items: Package_items[] | null;
  shippingLabel: Package_shippingLabel;
  fromAddress: Package_fromAddress;
  toAddress: Package_toAddress;
  weight: number | null;
}
