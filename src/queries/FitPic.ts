import { GET_ONE, GET_LIST } from "@seasons/react-admin"
import gql from "graphql-tag"

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
  }
`

export default {
  [GET_LIST]: FitPic,
  [GET_ONE]: FitPic,
}
