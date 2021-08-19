import { GET_ONE, GET_LIST } from "@seasons/react-admin"
import gql from "graphql-tag"

export const CategoryFragment = gql`
  fragment CategoryFragment on Category {
    id
    slug
    recoupment
    description
    dryCleaningFee
    singularName
    name
    visible
  }
`

export const CATEGORY_EDIT_QUERY = gql`
  query CategoryEditQuery($input: CategoryWhereUniqueInput!) {
    category(where: $input) {
      ...CategoryFragment
    }
  }
  ${CategoryFragment}
`

export default {
  [GET_ONE]: CategoryFragment,
  [GET_LIST]: CategoryFragment,
}
