import { GET_LIST } from "react-admin"
import gql from "graphql-tag"

import Brand from "./Brand"
import Product from "./Product"
import Order from "./Order"

export default {
  Product,
  Order,
  Brand,
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
    colors {
      id
      name
    }

    brands {
      id
      name
      slug
    }
  }
`
