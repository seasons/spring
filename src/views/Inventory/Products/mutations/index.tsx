import gql from "graphql-tag"
import { UpdateVariantFragment } from "../queries"

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
  mutation($where: ProductWhereUniqueInput!, $data: CustomProductUpdateInput!) {
    updateProduct(where: $where, data: $data) {
      ...UpdateVariant
    }
  }
  ${UpdateVariantFragment}
`

export const UPDATE_VARIANT = gql`
  mutation UpdateVariant($input: UpdateVariantInput!) {
    updateProductVariant(input: $input) {
      id
      sku
      internalSize {
        id
        top {
          id
        }
        bottom {
          id
        }
      }
    }
  }
`
