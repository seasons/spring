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
        path: "/community",
        exact: true,
        component: props => <FitPicList {...props} basePath="/community" resource="FitPic" />,
      },
      {
        path: "/community/create",
        exact: true,
        component: props => <CreateFitPicView {...props} basePath="/community/create" resource="FitPic" />,
      },
      {
        path: "/community/fit-pic/:id",
        exact: true,
        component: props => <FitPicView {...props} basePath="/community/fit-pic" resource="FitPic" />,
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
        path: "/inventory/product/variant/physicalProduct/:physicalProductID",
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
        path: "/reservation/:id/:tab",
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
