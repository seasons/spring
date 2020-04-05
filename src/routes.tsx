// Packages
import React from "react"
import { Redirect } from "react-router-dom"

// Views
import { Dashboard } from "./layouts/Dashboard"
import { CustomerList } from "./views/Members"
import InventoryView from "./views/Inventory"
import { ReservationsList } from "./views/Reservations"
import OverviewView from "./views/Overview"
import AnalyticsView from "./views/Analytics"

export default [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/overview" />,
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
        path: "/inventory/:tab",
        exact: true,
        component: props => <InventoryView {...props} basePath="/inventory" resource="Product" />,
      },
      {
        path: "/members",
        exact: true,
        component: props => <CustomerList {...props} basePath="/customers" resource="Customer" />,
      },
      {
        path: "/reservations",
        exact: true,
        component: props => <ReservationsList {...props} basePath="/reservations" resource="Reservation" />,
      },
    ],
  },
]
