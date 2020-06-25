import { GET_ONE, GET_LIST } from "@seasons/react-admin"
import gql from "graphql-tag"

const PhysicalProductFragment = gql`
  fragment PhysicalProduct on PhysicalProduct {
    id
    seasonsUID
    warehouseLocation {
      id
      barcode
      locationCode
      itemCode
      type
    }
    productVariant {
      product {
        name
        images {
          url
        }
      }
    }
  }
`

export default {
  [GET_LIST]: PhysicalProductFragment,
  [GET_ONE]: PhysicalProductFragment,
}
