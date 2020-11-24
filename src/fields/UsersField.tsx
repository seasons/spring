import React from "react"
import { Link } from "@material-ui/core"
import { Link as RouterLink } from "react-router-dom"
import { Text } from "components/Text"
import { colors } from "theme/colors"

interface UserFieldProps {
  label?: string
  record?: { users: { fullName: string; id: string; customer: { id: string } }[] }
}

export const UsersField: React.FC<UserFieldProps> = ({ record }) => {
  const users = [...record?.users]
  const numRemainingUsers = users.splice(3)?.length
  const firstThreeUsers = users
  return (
    <>
      {firstThreeUsers?.map(u => (
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
      {numRemainingUsers > 0 && (
        <Text variant="body2" color={colors.black50}>
          ...{numRemainingUsers} more
        </Text>
      )}
    </>
  )
}
