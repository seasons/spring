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
  ProductVariantEdit,
  ReservationList,
  ReservationView,
  BrandCreate,
  BrandEdit,
  LaunchEdit,
  LaunchCreate,
  SearchView,
  CategoryEdit,
  CategoryCreate,
} from "./views"
import { NotificationsList } from "views/Notifications/NotificationsList"
import { CreateFitPicView, FitPicView } from "views/Community"
import { CollectionsList, CollectionsEdit, CollectionsCreate } from "views/Collections"
import { OrderList, OrderView } from "views/Inventory/Orders"
import { HistoryList } from "views/History/HistoryList"

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
        component: () => <OverviewView />,
      },
      {
        path: "/search",
        exact: true,
        component: () => <SearchView />,
      },
      {
        path: "/analytics",
        exact: true,
        component: AnalyticsView,
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
        path: "/inventory/categories/new",
        exact: true,
        component: props => <CategoryCreate {...props} basePath="/inventory/categories/new" resource="Category" />,
      },
      {
        path: "/inventory/categories/:categoryID",
        exact: true,
        component: props => <CategoryEdit {...props} basePath="/inventory/categories" resource="Category" />,
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
        component: props => <ProductVariantEdit {...props} basePath="/inventory/product/variants" resource="Product" />,
      },
      {
        path: "/inventory/product/:productID/variant/new",
        exact: true,
        component: props => (
          <ProductVariantCreate {...props} basePath="/inventory/product/variant/new" resource="Product" />
        ),
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
        path: "/inventory/launches/new",
        exact: true,
        component: props => <LaunchCreate {...props} basePath="/inventory/launches/new" resource="Launch" />,
      },
      {
        path: "/inventory/launches/:launchID",
        exact: true,
        component: props => <LaunchEdit {...props} basePath="/inventory/launches" resource="Launch" />,
      },
      {
        path: "/history",
        exact: true,
        component: props => <HistoryList {...props} basePath="/history" resource="Reservation" />,
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
        path: "/orders",
        exact: true,
        component: props => <OrderList {...props} basePath="/orders" resource="Order" />,
      },
      {
        path: "/orders/:orderID",
        exact: true,
        component: props => <OrderView {...props} basePath="/orders" resource="Order" />,
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
