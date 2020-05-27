import React from "react"

import { DateTime } from "luxon"

import { Header as BaseHeader } from "components"
import { MemberViewHeaderProps } from "./interfaces"

export const Header: React.FunctionComponent<MemberViewHeaderProps> = ({ history, member }) => {
  const memberSince = DateTime.fromISO(member.user.createdAt).toLocaleString(DateTime.DATE_MED)
  const user = member.user
  const fullName = `${user.firstName} ${user.lastName}`
  return (
    <BaseHeader
      title={fullName}
      subtitle={`Joined ${memberSince}`}
      breadcrumbs={[
        {
          title: "Members",
          url: "/members",
        },
        {
          title: `Member: ${fullName}`,
          url: `/members/${member.id}/account`,
        },
      ]}
    />
  )
}
