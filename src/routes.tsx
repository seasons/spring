import React from "react"
import { Redirect } from "react-router-dom"
import { Dashboard } from "./layouts/Dashboard"
import { CustomerList } from "./views/Members"
import InventoryView from "./views/Inventory"
import { ReservationsList } from "./views/Reservations"
import OverviewView from "./views/Overview"
import AnalyticsView from "./views/Analytics"
import { Login } from "Login"
import PrivateRoute from "components/PrivateRoute"
import { Switch } from "@material-ui/core"

export default [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/overview" />,
  },
  {
    path: "/login",
    exact: true,
    component: Login,
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

export const routes: React.FC<any> = props => {
  return (
    <Switch>
      <PrivateRoute path="/overview" component={OverviewView} exact />
      <PrivateRoute path="/analytics" component={AnalyticsView} exact />
      <PrivateRoute
        path="/inventory/:tab"
        component={props => <InventoryView {...props} basePath="/inventory" resource="Product" />}
      />
      <PrivateRoute
        path="/members"
        component={props => <CustomerList {...props} basePath="/customers" resource="Customer" />}
        exact
      />
      <PrivateRoute
        path="/reservations"
        component={props => <ReservationsList {...props} basePath="/reservations" resource="Reservation" />}
        exact
      />
    </Switch>
  )
}
