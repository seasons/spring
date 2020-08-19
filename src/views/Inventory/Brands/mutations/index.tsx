import gql from "graphql-tag"

export const CREATE_BRAND = gql`
  mutation CreateBrand($input: CustomBrandCreateInput!) {
    createBrand(input: $input) {
      id
      name
      slug
      brandCode
    }
  }
`

export const UPDATE_BRAND = gql`
  mutation UpdateBrand($where: BrandWhereUniqueInput!, $data: CustomBrandUpdateInput!) {
    updateBrand(where: $where, data: $data) {
      id
      name
      slug
      brandCode
    }
  }
`
