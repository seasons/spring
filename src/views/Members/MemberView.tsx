import React from "react"

import { AccountView } from "./Account"
import { HistoryView } from "./History"
import { MemberViewProps } from "./interfaces"
import { PersonalView } from "./Personal"
import { PushNotificationsView } from "./Notifications"
import { DetailView } from "components/DetailView"
import { Header } from "./Header"

export const MemberView: React.FunctionComponent<MemberViewProps> = ({ match, props }) => {
  return (
    <DetailView
      match={match}
      resource={"Customer"}
      renderHeader={({ data: member }) => {
        return <Header member={member} />
      }}
      tabs={[
        {
          value: "account",
          label: "Account",
          render: ({ data, adminKey, match, recordID }) => (
            <AccountView
              {...props}
              member={data}
              adminKey={adminKey}
              basePath={`/members/${recordID}/account`}
              match={match}
            />
          ),
        },
        {
          value: "personal",
          label: "Personal",
          render: ({ data, adminKey, recordID }) => (
            <PersonalView {...props} basePath={`/members/${recordID}/personal`} member={data} adminKey={adminKey} />
          ),
        },
        {
          value: "history",
          label: "History",
          render: ({ data, recordID }) => (
            <HistoryView {...props} basePath={`/members/${recordID}/history`} member={data} />
          ),
        },
        {
          value: "notifs",
          label: "Notifications",
          render: ({ data, recordID }) => (
            <PushNotificationsView {...props} basePath={`/members/${recordID}/notifs`} member={data} />
          ),
        },
      ]}
      {...props}
    />
  )
}
