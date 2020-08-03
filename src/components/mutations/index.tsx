import gql from "graphql-tag"

export const CREATE_EMBED_URL = gql`
  mutation CreateEmbedURL($input: CreateEmbedURLInput!) {
    createEmbedURL(input: $input)
  }
`
