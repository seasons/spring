import gql from "graphql-tag"

export const UPSERT_COLLECTION = gql`
  mutation UpsertCollection($data: CollectionUpsertInput!) {
    upsertCollection(data: $data) {
      id
    }
  }
`
