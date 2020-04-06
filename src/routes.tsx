import React, { lazy } from "react"
import { Redirect } from "react-router-dom"
import { Dashboard } from "./layouts/Dashboard"
import { ProductCreate } from "./views/Products/ProductCreate"
import { ReservationsList } from "./Reservations"
import { UserList } from "./users"
import { CustomerList } from "./views/Customers/Customers"
import { PackageList } from "./Packages"
import { BrandList } from "./views/Brands"
import { CategoryList } from "./views/Categories"
import { ProductList, ProductEdit } from "./views/Products/ProductList"

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
    component: () => <Redirect to="/products" />,
  },
  {
    route: "*",
    component: Dashboard,
    routes: [
      {
        path: "/products",
        exact: true,
        component: props => <ProductList {...props} basePath="/products" resource="Product" />,
      },
      {
        path: "/customers",
        exact: true,
        component: props => <CustomerList {...props} basePath="/customers" resource="Customer" />,
      },
    ],
  },
]
