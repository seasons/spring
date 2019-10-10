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
  Attribute: {
    [GET_LIST]: gql`
      fragment attribute on Attribute {
        id
        value
        category {
          id
          name
        }
        shop {
          id
          name
        }
      }
    `,
  },
  Option: {
    [GET_LIST]: gql`
      fragment option on Option {
        id
        name
        values {
          name
        }
        shop {
          id
          name
        }
      }
    `,
  },
}
