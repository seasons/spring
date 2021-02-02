import gql from "graphql-tag"

export const NOTIFY_USER = gql`
  mutation pushNotifyUser($email: String!, $data: PushNotifDataInput!) {
    pushNotifyUser(where: { email: $email }, data: $data) {
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

export const GET_USERS = gql`
  query users {
    users {
      id
      fullName
      email
      customer {
        id
        status
      }
    }
  }
`
