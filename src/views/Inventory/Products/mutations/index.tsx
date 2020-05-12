import gql from "graphql-tag"

export const UPLOAD_FILE = gql`
  mutation($image: Upload!) {
    uploadImage(image: $image)
  }
`

export const UPSERT_PRODUCT = gql`
  mutation($input: UpsertProductInput!) {
    upsertProduct(input: $input) {
      id
      name
      variants {
        id
        sku
        physicalProducts {
          id
          seasonsUID
        }
      }
    }
  }
`
