import gql from "graphql-tag"

export const CUSTOMER_DETAIL_UPDATE = gql`
  mutation updateCustomerDetails($details: CustomerDetailCreateInput!, $status: CustomerStatus) {
    addCustomerDetails(details: $details, status: $status) {
      id
    }
  }
`
