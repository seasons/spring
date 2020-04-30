import React from "react"
import { Link } from "@material-ui/core"
import { Link as RouterLink } from "react-router-dom"

interface MemberFieldProps {
  label?: string
  record?: any
}

export const MemberField: React.FC<MemberFieldProps> = ({ label, record }) => {
  const firstName = record?.customer?.user?.firstName
  const lastName = record?.customer?.user?.lastName
  const customerId = record?.customer?.id

  return (
    <Link
      component={RouterLink}
      to={`/members/${customerId}/account`}
      variant="body1"
      onClick={e => e.stopPropagation()}
    >{`${firstName} ${lastName}`}</Link>
  )
}
