/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ElementType } from "./globalTypes"

// ====================================================
// GraphQL query operation: GetDashboard
// ====================================================

export interface GetDashboard_dashboard_elements {
  __typename: "AnalyticsDashboardElement"
  id: string
  type: ElementType | null
  slug: string | null
  title: string | null
  view: string | null
  result: any | null
}

export interface GetDashboard_dashboard {
  __typename: "AnalyticsDashboard"
  id: string
  name: string | null
  elements: GetDashboard_dashboard_elements[] | null
}

export interface GetDashboard {
  dashboard: GetDashboard_dashboard | null
}
