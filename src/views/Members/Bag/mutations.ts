import gql from "graphql-tag"

export const GENERATE_LABELS = gql`
  mutation generateLabels($customerID: ID!) {
    generateShippingLabels(customerID: $customerID) {
      id
      direction
      shippingLabel {
        id
        trackingNumber
        trackingURL
        image
      }
    }
  }
`
