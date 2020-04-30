import gql from "graphql-tag"

export const UPLOAD_FILE = gql`
  mutation($files: [Upload!]!) {
    uploadFiles(files: $files) {
      url
    }
  }
`

export const GET_GENERATED_VARIANT_SKUS = gql`
  query GetGeneratedVariantSkus($input: ProductVariantSKUsInput!) {
    generatedVariantSKUs(input: $input)
  }
`
