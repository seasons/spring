import { GET_ONE, GET_LIST } from "@seasons/react-admin"
import gql from "graphql-tag"

const FitPicList = gql`
  fragment fitPic on FitPic {
    id
    author
    status
    createdAt
    updatedAt
    image {
      id
      url
    }
    location {
      city
      state
    }
    reports {
      id
      status
      reportedAt
    }
  }
`

const FitPicOne = gql`
  fragment fitPic on FitPic {
    id
    author
    status
    createdAt
    updatedAt
    image {
      id
      url
    }
    location {
      city
      state
    }
    reports {
      id
      status
      reportedAt
    }
    products {
      id
    }
    user {
      id
      customer {
        id
        reservations(orderBy: createdAt_DESC) {
          id
          createdAt
          products {
            id
            productVariant {
              id
              product {
                id
                id
                name
                images(size: Thumb) {
                  id
                  url
                }
                brand {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`

export default {
  [GET_LIST]: FitPicList,
  [GET_ONE]: FitPicOne,
}
