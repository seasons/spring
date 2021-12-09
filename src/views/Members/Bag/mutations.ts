import gql from "graphql-tag"

export const GENERATE_LABELS = gql`
  mutation generateLabels($bagItemIds: [ID!]!) {
    generateShippingLabels(bagItemIds: $bagItemIds) {
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
