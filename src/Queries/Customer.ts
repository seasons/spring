import { CREATE, GET_ONE, GET_LIST } from "react-admin"
import gql from "graphql-tag"

const CustomerFragment = gql`
  fragment customer on Customer {
    id
    user {
      id
      email
    }
    detail {
      id
      phoneNumber
      birthday
      height
      weight
      bodyType
      averageTopSize
      averageWaistSize
      averagePantLength
      preferredPronouns
      profession
      partyFrequency
      travelFrequency
      shoppingFrequency
      averageSpend
      style
      commuteStyle
      shippingAddress {
        id
      }
      phoneOS
      insureShipment
    }
    plan
  }
`

export default {
  [GET_LIST]: CustomerFragment,
  [GET_ONE]: CustomerFragment,
  [CREATE]: CustomerFragment,
}
