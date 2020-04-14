import { GET_LIST } from "react-admin"
import gql from "graphql-tag"

import Brand from "./Brand"
import Product from "./Product"
import Order from "./Order"
import Reservation from "./Reservation"
import User from "./User"
import Customer from "./Customer"
import Package from "./Package"
import PhysicalProduct from "./PhysicalProduct"
import Size from "./Size"

export default {
  Product,
  Order,
  Brand,
  Reservation,
  User,
  Customer,
  Package,
  PhysicalProduct,
  Size,
  Category: {
    [GET_LIST]: gql`
      fragment category on Category {
        id
        name
      }
    `,
  },
}

export const getAllBrands = gql`
  query getAllBrands {
    brands {
      id
      name
      slug
    }
  }
`

export const getAllColors = gql`
  query getAllColors {
    colors {
      id
      name
    }
  }
`

export const productCreateQuery = gql`
  query productCreateQuery {
    bottomSizes {
      value
    }

    brands {
      id
      name
      slug
    }
  
    colors {
      id
      name
      hexCode
    }

    materials: __type(name: "Material") {
      enumValues {
        name
      }
    }

    productFunctions {
      id
      name
    }

    productModels {
      id
      name
    }

    productTypes: __type(name: "ProductType") {
      enumValues {
        name
      }
    }

    topSizes {
  	  letter
    }
  }
`
