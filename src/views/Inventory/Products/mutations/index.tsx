import gql from "graphql-tag"
import { UpdatePhysicalProductFragment, UpdateVariantFragment } from "../queries"

export const UPLOAD_FILE = gql`
  mutation UploadImage($image: Upload!) {
    uploadImage(image: $image)
  }
`

export const UPSERT_PRODUCT = gql`
  mutation UpsertProduct($input: UpsertProductInput!) {
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
  mutation UpdateProduct($where: ProductWhereUniqueInput!, $data: CustomProductUpdateInput!) {
    updateProduct(where: $where, data: $data) {
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

export const UPSERT_VARIANTS = gql`
  mutation UpsertProductVariants($productID: ID!, $inputs: [UpsertVariantInput!]!) {
    upsertProductVariants(productID: $productID, inputs: $inputs) {
      id
      sku
      total
      weight
    }
  }
`

export const UPDATE_VARIANT = gql`
  mutation UpdateVariant($input: UpdateVariantInput!) {
    updateProductVariant(input: $input) {
      ...UpdateVariant
    }
  }
  ${UpdateVariantFragment}
`

export const UPDATE_PHYSICAL_PRODUCT = gql`
  mutation UpdatePhysicalProduct($where: PhysicalProductWhereUniqueInput!, $data: PhysicalProductUpdateInput!) {
    updatePhysicalProduct(where: $where, data: $data) {
      ...UpdatePhysicalProduct
    }
  }
  ${UpdatePhysicalProductFragment}
`

export const UPDATE_PHYSICAL_PRODUCTS = gql`
  mutation UpdateManyPhysicalProducts($where: PhysicalProductWhereInput) {
    updateManyPhysicalProducts(where: $where, data: { barcoded: true }) {
      count
    }
  }
`
