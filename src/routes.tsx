// Packages
import React from "react"
import { Redirect } from "react-router-dom"

// Layout
import { Dashboard } from "./layouts/Dashboard"
import { CustomerList } from "./views/Customers"
import { ProductList } from "./views/Products"
// import { ProductList, ProductEdit } from "./views/Products"

// import { ProductCreate } from "./views/Products/ProductCreate"
// import { ReservationsList } from "./Reservations"
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
