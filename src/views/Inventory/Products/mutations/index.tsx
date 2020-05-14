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

export const UPDATE_PRODUCT = gql`
  mutation($where: ProductWhereUniqueInput!, $data: ProductUpdateInput!, $customData: CustomUpdateProductInput!) {
    updateProduct(where: $where, data: $data, customData: $customData) {
      id
      name
      description
      functions {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`
