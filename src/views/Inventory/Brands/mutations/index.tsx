import gql from "graphql-tag"

export const CREATE_BRAND = gql`
  mutation CreateBrand($input: BrandCreateInput!) {
    createBrand(input: $input) {
      id
      name
      slug
      brandCode
    }
  }
`
