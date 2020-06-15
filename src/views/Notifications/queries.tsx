import gql from "graphql-tag"

export const NOTIFY_USER = gql`
  mutation pushNotifyUser($id: ID!, $data: PushNotifDataInput!) {
    pushNotifyUser(where: { id: $id }, data: $data) {
      id
    }
  }
`

export const NOTIFY_INTEREST = gql`
  mutation pushNotifyInterest($interest: PushNotificationInterest, $data: PushNotifDataInput!) {
    pushNotifyInterest(interest: $interest, data: $data, debug: false) {
      id
    }
  }
`
