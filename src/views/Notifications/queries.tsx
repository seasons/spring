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
    # TODO: Turn off debug
    pushNotifyInterest(interest: $interest, data: $data, debug: true) {
      id
    }
  }
`

export const GET_USERS = gql`
  query users {
    users {
      fullName
      email
      customer {
        status
      }
    }
  }
`
