import gql from "graphql-tag"

export const CREATE_BRAND = gql`
  mutation CREATE_BRAND($input: BrandCreateInput!) {
    createBrand(input: $input) {
      id
      name
      slug
      brandCode
    }
  }
`
