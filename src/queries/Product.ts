import { CREATE, GET_ONE, GET_LIST } from "react-admin"
import gql from "graphql-tag"

const ProductFragment = gql`
  fragment product on Product {
    id
    name
    description
    images(size: Small) {
      url
    }
    retailPrice
    createdAt
    updatedAt
    brand {
      id
      name
    }
    category {
      id
      name
    }
  }
`

const GetOneProductFragment = gql`
  fragment GetOneProduct on Product {
    id
    architecture
    createdAt
    description
    brand {
      id
      name
    }
    category {
      id
      name
    }
    color {
      id
      name
    }
    functions {
      id
      name
    }
    images(size: Small) {
      url
    }
    innerMaterials
    model {
      id
      name
    }
    modelSize {
      id
      display
    }
    name
    outerMaterials
    retailPrice
    season
    secondaryColor {
      id
      name
    }
    status
    tags {
      id
      name
    }
    type
    updatedAt
    variants {
      id
      sku
      internalSize {
        id
        display
        productType
        top {
          id
          letter
        }
        bottom {
          id
          value
        }
      }
      physicalProducts {
        id
        seasonsUID
        productStatus
      }
    }
  }
`

console.log("GET ONE", GetOneProductFragment)
export default {
  [GET_LIST]: ProductFragment,
  [GET_ONE]: GetOneProductFragment,
  [CREATE]: ProductFragment,
}
