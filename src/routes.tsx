import React from "react"
import { Redirect } from "react-router-dom"

import { Dashboard } from "./layouts/Dashboard"
import {
  AnalyticsView,
  FitPicList,
  InventoryView,
  LoginView,
  MemberList,
  MemberView,
  OverviewView,
  PhysicalProductView,
  ProductCreate,
  ProductEdit,
  ProductVariantCreate,
  ReservationList,
  ReservationView,
  VariantEdit,
  BrandCreate,
  BrandEdit,
} from "./views"
import { NotificationsList } from "views/Notifications/NotificationsList"
import { AnalyticsReport } from "components/AnalyticsReport"
import { ViewType } from "generated/globalTypes"
import { CreateFitPicView, FitPicView } from "views/Community"
import { CollectionsList, CollectionsEdit, CollectionsCreate } from "views/Collections"

export default [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/overview" />,
  },
  {
    path: "/login",
    exact: true,
    component: LoginView,
  },
  {
    route: "*",
    component: Dashboard,
    routes: [
      {
        path: "/overview",
        exact: true,
        component: OverviewView,
      },
      {
        path: "/analytics",
        exact: true,
        component: AnalyticsView,
      },
      {
        path: "/analytics/inventory-health",
        exact: true,
        component: () => (
          <AnalyticsReport title="Inventory Health" url={"/inventory-health"} type={ViewType.Dashboard} index={4} />
        ),
      },
      {
        path: "/sales/reactivations",
        exact: true,
        component: () => (
          <AnalyticsReport title="Reactivations" url={"/reactivations"} type={ViewType.Dashboard} index={8} />
        ),
      },
      ...[
        { month: "Nov", index: 9 },
        { month: "Dec", index: 10 },
      ].map(a => ({
        path: `/sales/${a.month.toLowerCase()}19`,
        exact: true,
        component: () => (
          <AnalyticsReport
            title={`${a.month} 19 Sales`}
            url={`/${a.month.toLowerCase}19`}
            type={ViewType.Dashboard}
            index={a.index}
          />
        ),
      })),
      ...[
        { month: "Jan", index: 11 },
        { month: "Feb", index: 12 },
        { month: "Mar", index: 13 },
        { month: "Apr", index: 14 },
        { month: "May", index: 15 },
        { month: "Jun", index: 16 },
        { month: "Jul", index: 17 },
        { month: "Aug", index: 18 },
        { month: "Sep", index: 19 },
        { month: "Oct", index: 20 },
        { month: "Nov", index: 21 },
        { month: "Dec", index: 22 },
      ].map(a => ({
        path: `/sales/${a.month.toLowerCase()}20`,
        exact: true,
        component: () => (
          <AnalyticsReport
            title={`${a.month} 20 Sales`}
            url={`/${a.month.toLowerCase}20`}
            type={ViewType.Dashboard}
            index={a.index}
          />
        ),
      })),
      {
        path: "/analytics/inventory-health/detail",
        exact: true,
        component: () => (
          <AnalyticsReport
            title="Inventory Health Detail"
            url={"/inventory-health/detail"}
            type={ViewType.Dashboard}
            index={5}
          />
        ),
      },
      {
        path: "/content/community",
        exact: true,
        component: props => <FitPicList {...props} basePath="/content/community" resource="FitPic" />,
      },
      {
        path: "/content/community/create",
        exact: true,
        component: props => <CreateFitPicView {...props} basePath="/content/community/create" resource="FitPic" />,
      },
      {
        path: "/content/community/fit-pic/:id",
        exact: true,
        component: props => <FitPicView {...props} basePath="/content/community/fit-pic" resource="FitPic" />,
      },
      {
        path: "/content/collections",
        exact: true,
        component: props => <CollectionsList {...props} basePath="/content/collections" resource="Collection" />,
      },
      {
        path: "/content/collections/create",
        exact: true,
        component: props => (
          <CollectionsCreate {...props} basePath="/content/collections/create" resource="Collection" />
        ),
      },
      {
        path: "/content/collections/:collectionID",
        exact: true,
        component: props => <CollectionsEdit {...props} basePath="/content/collections" resource="Collection" />,
      },
      {
        path: "/inventory/:tab",
        exact: true,
        component: props => <InventoryView {...props} basePath="/inventory" resource="Product" />,
      },
      {
        path: "/inventory/products/:productID",
        exact: true,
        component: props => <ProductEdit {...props} basePath="/inventory/products" resource="Product" />,
      },
      {
        path: "/inventory/product/variants/:variantID",
        exact: true,
        component: props => <VariantEdit {...props} basePath="/inventory/product/variants" resource="Product" />,
      },
      {
        path: "/inventory/product/variant/physicalProduct/:id/:tab",
        exact: true,
        component: props => (
          <PhysicalProductView {...props} basePath="/inventory/product/variant/physicalProduct" resource="Product" />
        ),
      },
      {
        path: "/inventory/product/new",
        exact: true,
        component: props => <ProductCreate {...props} basePath="/inventory/product/new" resource="Product" />,
      },
      {
        path: "/inventory/brands/new",
        exact: true,
        component: props => <BrandCreate {...props} basePath="/inventory/brands/new" resource="Brand" />,
      },
      {
        path: "/inventory/brands/:brandID",
        exact: true,
        component: props => <BrandEdit {...props} basePath="/inventory/brands" resource="Brand" />,
      },
      {
        path: "/inventory/product/:productID/variant/new",
        exact: true,
        component: props => (
          <ProductVariantCreate {...props} basePath="/inventory/product/variant/new" resource="Product" />
        ),
      },
      {
        path: "/members",
        exact: true,
        component: props => <MemberList {...props} basePath="/members" resource="Customer" />,
      },
      {
        path: "/members/:id/:tab",
        exact: true,
        component: props => <MemberView {...props} basePath="/members/:id" resource="Customer" />,
      },
      {
        path: "/reservations",
        exact: true,
        component: props => <ReservationList {...props} basePath="/reservations" resource="Reservation" />,
      },
      {
        path: "/reservation/:id/:tab?",
        exact: true,
        component: props => <ReservationView {...props} basePath="/reservation" resource="Reservation" />,
      },
      {
        path: "/notifications",
        exact: true,
        component: props => (
          <NotificationsList {...props} basePath="/notifications" resource="PushNotificationReceipt" />
        ),
      },
    ],
  },
]
