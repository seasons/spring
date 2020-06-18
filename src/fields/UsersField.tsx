import React from "react"
import { Link } from "@material-ui/core"
import { Link as RouterLink } from "react-router-dom"

interface UserFieldProps {
  label?: string
  record?: { users: { fullName: string; id: string; customer: { id: string } }[] }
}

export const UsersField: React.FC<UserFieldProps> = ({ record }) => {
  return (
    <>
      {record?.users?.map(u => (
        <>
          <Link
            component={RouterLink}
            to={`/members/${u?.customer?.id}/notifs`}
            variant="body1"
            onClick={e => e.stopPropagation()}
          >
            {u.fullName}
          </Link>
          <br />
        </>
      ))}
    </>
  )
}
