import { GET_ONE, GET_LIST } from "@seasons/react-admin"
import gql from "graphql-tag"

const PackageFragment = gql`
  fragment Package on Package {
    id
    items {
      id
      seasonsUID
    }
    shippingLabel {
      id
    }
    fromAddress {
      id
    }
    toAddress {
      id
    }
    weight
  }
`

export default {
  [GET_LIST]: PackageFragment,
  [GET_ONE]: PackageFragment,
}
