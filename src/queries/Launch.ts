import { GET_ONE, GET_LIST } from "@seasons/react-admin"
import gql from "graphql-tag"

const LaunchFragment = gql`
  fragment LaunchFragment on Launch {
    id
    launchAt
    brand {
      id
      name
    }
    collection {
      id
      title
    }
  }
`

export const LAUNCH_CREATE_QUERY = gql`
  query LaunchCreateQuery {
    brands(orderBy: name_ASC) {
      id
      name
    }
    collections(orderBy: title_ASC) {
      id
      title
    }
  }
`

export const LAUNCH_EDIT_QUERY = gql`
  query LaunchEditQuery($input: LaunchWhereUniqueInput!) {
    launch(where: $input) {
      ...LaunchFragment
    }
    brands(orderBy: name_ASC) {
      id
      name
    }
    collections(orderBy: title_ASC) {
      id
      title
    }
  }
  ${LaunchFragment}
`

export default {
  [GET_ONE]: LaunchFragment,
  [GET_LIST]: LaunchFragment,
}
