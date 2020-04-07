import { GET_LIST } from "react-admin"
import gql from "graphql-tag"

export default {
  [GET_LIST]: gql`
    fragment order on Order {
      id
      totalPrice
      owner {
        id
        firstName
      }
      lineItems {
        id
        quantity
        variant {
          id
          available
          price
          product {
            id
            name
          }
          selectedOptions {
            id
            value {
              name
            }
          }
        }
      }
    }
  `,
}
