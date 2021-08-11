/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BagItemStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addToBag
// ====================================================

export interface addToBag_addToBag {
  __typename: "BagItem";
  id: string;
}

export interface addToBag {
  addToBag: addToBag_addToBag;
}

export interface addToBagVariables {
  customerID: string;
  item: string;
  status: BagItemStatus;
  saved: boolean;
}
