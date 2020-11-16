import { SinceDateField } from "fields"
import React from "react"
import { Datagrid, TextField } from "@seasons/react-admin"

import { Card, CardHeader, Divider } from "@material-ui/core"
import { MemberSubViewProps } from "./interfaces"

export const EmailReceiptsView: React.FC<MemberSubViewProps> = ({ member }) => {
  let normalizedEmails = {}
  member?.user?.emails?.forEach(a => (normalizedEmails[a.id] = a))
  const ids = member?.user?.emails?.map(a => a.id)

  return (
    <Card>
      <CardHeader title="Email Receipts" />
      <Divider />
      <Datagrid ids={ids} data={normalizedEmails} currentSort={{ field: "createdAt", order: "ASC" }}>
        <SinceDateField source="createdAt" label="Sent At" />
        <TextField source="emailId" label="Email Id" />
      </Datagrid>
    </Card>
  )
}
