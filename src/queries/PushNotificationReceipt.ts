import gql from "graphql-tag"
import { GET_LIST } from "@seasons/react-admin"

const PushNotificationReceipt = gql`
  fragment pushNotificationReceipt on PushNotificationReceipt {
    id
    title
    body
    route
    screen
    interest
    sentAt
    uri
    users {
      id
      email
      firstName
      lastName
    }
  }
`

export default {
  [GET_LIST]: PushNotificationReceipt,
}
