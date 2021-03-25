import gql from "graphql-tag"

export const UPSERT_LAUNCH = gql`
  mutation UpsertLaunch($where: LaunchWhereUniqueInput!, $data: CustomLaunchUpsertInput!) {
    upsertLaunch(where: $where, data: $data) {
      id
      launchAt
      collection {
        id
        title
      }
      brand {
        id
        name
      }
    }
  }
`
