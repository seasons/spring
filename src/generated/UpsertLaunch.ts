/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LaunchWhereUniqueInput, CustomLaunchUpsertInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpsertLaunch
// ====================================================

export interface UpsertLaunch_upsertLaunch_collection {
  __typename: "Collection";
  id: string;
  title: string | null;
}

export interface UpsertLaunch_upsertLaunch_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface UpsertLaunch_upsertLaunch {
  __typename: "Launch";
  id: string;
  launchAt: any;
  collection: UpsertLaunch_upsertLaunch_collection | null;
  brand: UpsertLaunch_upsertLaunch_brand | null;
}

export interface UpsertLaunch {
  upsertLaunch: UpsertLaunch_upsertLaunch | null;
}

export interface UpsertLaunchVariables {
  where: LaunchWhereUniqueInput;
  data: CustomLaunchUpsertInput;
}
