import React, { useState } from "react"

import { AccountView } from "./Account"
import { HistoryView } from "./History"
import { MemberViewProps } from "./interfaces"
import { PersonalView } from "./Personal"
import { PushNotificationsView } from "./Notifications"
import { DetailView } from "components/DetailView"
import { Header } from "./Header"
import { BagView } from "./Bag"
import { EmailReceiptsView } from "./EmailsView"
import { CreditBalanceUpdateHistory } from "./CreditUpdateHistory"
import { Box } from "@material-ui/core"
import { BillingView } from "./Billing/BillingView"

export const MemberView: React.FunctionComponent<MemberViewProps> = ({ match, props }) => {
  return (
    <DetailView
      match={match}
      resource="Customer"
      renderHeader={({ data: member }) => {
        return (
          <Box px={2}>
            <Header member={member} />
          </Box>
        )
      }}
      tabs={[
        {
          value: "bag",
          label: "Bag",
          render: ({ data, recordID, refetch }) => (
            <BagView {...props} basePath={`/members/${recordID}/bag`} customer={data} refetch={refetch} />
          ),
        },
        {
          value: "account",
          label: "Account",
          render: ({ data, adminKey, match, recordID }) => (
            <Box px={2}>
              <AccountView
                {...props}
                member={data}
                adminKey={adminKey}
                basePath={`/members/${recordID}/bag`}
                match={match}
              />
            </Box>
          ),
        },
        {
          value: "billing",
          label: "Billing",
          render: ({ data, adminKey, match, recordID }) => (
            <Box px={2}>
              <BillingView
                // {...props}
                member={data}
                // adminKey={adminKey}
                // basePath={`/members/${recordID}/bag`}
                // match={match}
              />
            </Box>
          ),
        },
        {
          value: "personal",
          label: "Personal",
          render: ({ data, adminKey, recordID }) => (
            <Box px={2}>
              <PersonalView {...props} basePath={`/members/${recordID}/personal`} member={data} adminKey={adminKey} />
            </Box>
          ),
        },
        {
          value: "history",
          label: "History",
          render: ({ data, recordID }) => (
            <Box px={2}>
              <HistoryView {...props} basePath={`/members/${recordID}/history`} member={data} />
            </Box>
          ),
        },
        {
          value: "notifs",
          label: "Notifications",
          render: ({ data, recordID }) => (
            <Box px={2}>
              <PushNotificationsView {...props} basePath={`/members/${recordID}/notifs`} member={data} />
            </Box>
          ),
        },
        {
          value: "emails",
          label: "Email Receipts",
          render: ({ data, recordID }) => (
            <Box px={2}>
              <EmailReceiptsView {...props} basePath={`/members/${recordID}/emails`} member={data} />
            </Box>
          ),
        },
        {
          value: "creditBalanceUpdateHistory",
          label: "Credit Update History",
          render: ({ data, recordID }) => (
            <CreditBalanceUpdateHistory {...props} basePath={`/members/${recordID}/history`} member={data} />
          ),
        },
      ]}
      {...props}
    />
  )
}
