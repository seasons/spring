/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FitPicReportStatus } from "./globalTypes"

// ====================================================
// GraphQL fragment: fitPic
// ====================================================

export interface fitPic_image {
  __typename: "Image"
  id: string
  url: string | null
}

export interface fitPic_location {
  __typename: "Location"
  city: string | null
  state: string | null
}

export interface fitPic_reports {
  __typename: "FitPicReport"
  id: string
  status: FitPicReportStatus
  reportedAt: any
}

export interface fitPic {
  __typename: "FitPic"
  id: string
  author: string
  approved: boolean
  createdAt: any
  updatedAt: any
  image: fitPic_image
  location: fitPic_location | null
  reports: fitPic_reports[]
}
