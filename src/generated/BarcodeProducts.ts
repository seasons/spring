/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BarcodeProducts
// ====================================================

export interface BarcodeProducts_physicalProducts {
  __typename: "PhysicalProduct";
  id: string;
  seasonsUID: string;
  sequenceNumber: number;
  barcoded: boolean;
  barcode: string;
}

export interface BarcodeProducts {
  physicalProducts: (BarcodeProducts_physicalProducts | null)[];
}
