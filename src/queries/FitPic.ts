import { GET_ONE, GET_LIST } from "@seasons/react-admin"
import gql from "graphql-tag"

// TODO: Make more efficient by making a simpler fragment for GET_LIST

const FitPic = gql`
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
        reservations {
          id
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
  [GET_LIST]: FitPic,
  [GET_ONE]: FitPic,
}
