// Packages
import React from "react"
import { Redirect } from "react-router-dom"

// Views
import { Dashboard } from "./layouts/Dashboard"
import { CustomerList } from "./views/Customers"
import { ProductList } from "./views/Products"
import { ReservationsList } from "./views/Reservations"
import OverviewView from "./views/Overview"

// import { ProductList, ProductEdit } from "./views/Products"
// import { ProductCreate } from "./views/Products/ProductCreate"
// import { UserList } from "./users"
// import { PackageList } from "./Packages"
// import { BrandList } from "./views/Brands"
// import { CategoryList } from "./views/Categories"

// <Resource name="Brand" list={BrandList} />
// <Resource name="Category" list={CategoryList} />
// <Resource name="Product" list={ProductList} edit={ProductEdit} create={ProductCreate} />
// <Resource name="Reservation" list={ReservationsList} />
// <Resource name="User" list={UserList} />
// <Resource name="Customer" list={CustomerList} />
// <Resource name="Package" list={PackageList} />
// <Resource name="PhysicalProduct" />

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
        path: "/products",
        exact: true,
        component: props => <ProductList {...props} basePath="/products" resource="Product" />,
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
