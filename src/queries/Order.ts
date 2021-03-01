import { GET_ONE, GET_LIST } from "@seasons/react-admin"
import gql from "graphql-tag"

const OrderList = gql`
  fragment Order on Order {
    id
    orderNumber
    customer {
      id
      user {
        id
        firstName
        lastName
        fullName
        email
      }
    }
    type
    total
    status
    note
    createdAt
    updatedAt
  }
`

const OrderView = gql`
  fragment Order on Order {
    id
    orderNumber
    customer {
      id
      user {
        id
        fullName
        email
      }
      detail {
        id
        shippingAddress {
          id
          name
          address1
          address2
          city
          state
        }
      }
    }
    sentPackage {
      id
      shippingLabel {
        id
        image
        trackingNumber
        trackingURL
      }
      weight
    }
    type
    lineItems {
      id
      recordID
      recordType
      needShipping
      taxRate
      taxName
      taxPercentage
      taxPrice
      price
      currencyCode
      createdAt
      productVariant {
        id
        sku
        displayLong
        color {
          id
          name
        }
        product {
          id
          name
          slug
          images {
            url
          }
          brand {
            id
            name
          }
        }
      }
    }
    subTotal
    total
    status
    note
    createdAt
    updatedAt
  }
`

export default {
  [GET_ONE]: OrderView,
  [GET_LIST]: OrderList,
}
