import { GET_ONE, GET_LIST } from "react-admin"
import gql from "graphql-tag"

const PhysicalProductFragment = gql`
  fragment PhysicalProduct on PhysicalProduct {
    id
    seasonsUID
  }
`

export default {
  [GET_LIST]: PhysicalProductFragment,
  [GET_ONE]: PhysicalProductFragment,
}
