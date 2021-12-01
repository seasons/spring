import { gql } from "graphql-tag"
import { CategoryFragment } from "queries/Category"

export const UPSERT_CATEGORY = gql`
  mutation UpsertCategory($where: CategoryWhereUniqueInput!, $data: CustomCategoryUpsertInput!) {
    upsertCategory(where: $where, data: $data) {
      id
      ...CategoryFragment
    }
  }
  ${CategoryFragment}
`
