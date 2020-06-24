import gql from "graphql-tag"

export const MEMBER_DETAIL_UPDATE = gql`
  mutation updateCustomer($id: ID!, $data: CustomerUpdateInput!) {
    updateCustomer(where: { id: $id }, data: $data) {
      id
    }
  }
`

export const MEMBER_CREATE = gql`
  mutation signup(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $details: CustomerDetailCreateInput!
  ) {
    signup(email: $email, password: $password, firstName: $firstName, lastName: $lastName, details: $details) {
      customer {
        id
      }
    }
  }
`

export const MEMBER_INVOICE_REFUND = gql`
  mutation refundInvoice($input: RefundInvoiceInput) {
    refundInvoice(input: $input)
  }
`

export const MEMBER_ASSIGN_ROLE = gql`
  mutation updateUser($email: String!, $data: UserUpdateInput!) {
    updateUser(where: { email: $email }, data: $data) {
      id
    }
  }
`
