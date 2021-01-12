/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BottomSizeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: ProductUpsertQuery
// ====================================================

export interface ProductUpsertQuery_bottomSizes {
  __typename: "BottomSize";
  type: BottomSizeType | null;
  value: string | null;
}

export interface ProductUpsertQuery_brands {
  __typename: "Brand";
  id: string;
  brandCode: string;
  name: string;
  slug: string;
}

export interface ProductUpsertQuery_inventoryStatuses_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface ProductUpsertQuery_inventoryStatuses {
  __typename: "__Type";
  enumValues: ProductUpsertQuery_inventoryStatuses_enumValues[] | null;
}

export interface ProductUpsertQuery_physicalProductStatuses_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface ProductUpsertQuery_physicalProductStatuses {
  __typename: "__Type";
  enumValues: ProductUpsertQuery_physicalProductStatuses_enumValues[] | null;
}

export interface ProductUpsertQuery_productArchitectures_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface ProductUpsertQuery_productArchitectures {
  __typename: "__Type";
  enumValues: ProductUpsertQuery_productArchitectures_enumValues[] | null;
}

export interface ProductUpsertQuery_productMaterialCategories {
  __typename: "ProductMaterialCategory";
  id: string;
  slug: string;
}

export interface ProductUpsertQuery_productModels {
  __typename: "ProductModel";
  id: string;
  name: string;
}

export interface ProductUpsertQuery_productTypes_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface ProductUpsertQuery_productTypes {
  __typename: "__Type";
  enumValues: ProductUpsertQuery_productTypes_enumValues[] | null;
}

export interface ProductUpsertQuery_tags {
  __typename: "Tag";
  name: string;
}

export interface ProductUpsertQuery {
  __typename: "Query";
  bottomSizes: (ProductUpsertQuery_bottomSizes | null)[];
  brands: (ProductUpsertQuery_brands | null)[];
  inventoryStatuses: ProductUpsertQuery_inventoryStatuses | null;
  physicalProductStatuses: ProductUpsertQuery_physicalProductStatuses | null;
  productArchitectures: ProductUpsertQuery_productArchitectures | null;
  productMaterialCategories: (ProductUpsertQuery_productMaterialCategories | null)[];
  productModels: (ProductUpsertQuery_productModels | null)[];
  productTypes: ProductUpsertQuery_productTypes | null;
  tags: (ProductUpsertQuery_tags | null)[];
}
