import React from "react"
import gql from "graphql-tag"
import { Link } from "@material-ui/core"
import { Link as RouterLink } from "react-router-dom"
import { useQuery } from "react-apollo"
import { head } from "lodash"

interface UserFieldProps {
  label?: string
  record?: { users: { firstName: string; lastName: string; id: string }[] }
}

interface LazyUserLinkProps {
  userId: string
  children: React.ReactNode
}

const GET_CORRESPONDING_CUSTOMER = gql`
  query customer($userId: ID!) {
    customers(where: { user: { id: $userId } }) {
      id
      user {
        id
      }
    }
  }
`

const LazyUserLink: React.FC<LazyUserLinkProps> = ({ userId, children }) => {
  const { data } = useQuery(GET_CORRESPONDING_CUSTOMER, {
    variables: { userId },
  })
  const customerId = data?.customers?.[0]?.id
  return (
    <Link
      component={RouterLink}
      to={`/members/${customerId}/notifs`}
      variant="body1"
      onClick={e => e.stopPropagation()}
    >
      {children}
    </Link>
  )
}
export const UsersField: React.FC<UserFieldProps> = ({ label, record }) => {
  return (
    <>
      {record?.users.map(u => (
        <>
          <LazyUserLink userId={u.id}>{`${u.firstName} ${u.lastName}`} </LazyUserLink>
          <br />
        </>
      ))}
    </>
  )
}
