import { SinceDateField } from "fields"
import React from "react"
import { Datagrid, TextField } from "@seasons/react-admin"

import { Card, CardHeader, Divider } from "@material-ui/core"

import { MemberSubViewProps } from "../interfaces"

export const PushNotificationsView: React.FC<MemberSubViewProps> = ({ member }) => {
  let normalizedPushNotifs = {}
  member?.user?.pushNotification?.history?.forEach(notif => (normalizedPushNotifs[notif.id] = notif))
  const ids = member?.user?.pushNotification?.history?.map(p => p.id)

  return (
    <Card>
      <CardHeader title="Push Notifications" />
      <Divider />
      <Datagrid ids={ids} data={normalizedPushNotifs} currentSort={{ field: "sentAt", order: "ASC" }}>
        <SinceDateField source="sentAt" label="Sent At" />
        <TextField source="title" label="Title" />
        <TextField source="body" label="Body" />
        <TextField source="route" label="Route" />
        <TextField source="screen" label="Screen" />
        <TextField source="uri" label="URI" />
      </Datagrid>
    </Card>
  )
}
