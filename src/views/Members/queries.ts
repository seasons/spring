import gql from "graphql-tag"

export const CUSTOMER_DETAIL_UPDATE = gql`
  mutation updateCustomer($id: ID!, $data: CustomerUpdateInput!) {
    updateCustomer(where: { id: $id }, data: $data) {
      id
    }
  }
`
