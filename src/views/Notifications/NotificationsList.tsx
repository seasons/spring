import { Header } from "components/Header"
import { EntityCountField, FullNameField, StatusField, ViewEntityField, SinceDateField, MemberField } from "fields"
import React, { useState } from "react"
import { Datagrid, List, TextField } from "@seasons/react-admin"

import { Card, Container } from "@material-ui/core"
import { MemberViewProps } from "views/Members/interfaces"
import { UsersField } from "fields/UsersField"
import { SendPushNotificationModal } from "./SendPushNotification"

export const NotificationsList: React.FC<MemberViewProps> = ({ match, props }) => {
  const [openEdit, setOpenEdit] = useState(false)

  const sendPushNotif = () => {
    setOpenEdit(true)
  }
  const handleEditClose = () => {
    setOpenEdit(false)
  }

  return (
    <Container maxWidth={false}>
      <Header
        title="Notifications"
        primaryButton={{ text: "Send Push Notif", action: sendPushNotif }}
        breadcrumbs={[
          {
            title: "Notifications",
            url: "/notifications",
          },
        ]}
      />
      <Card>
        <List
          {...props}
          perPage={10}
          hasCreate={false}
          hasEdit={false}
          hasList={true}
          hasShow={true}
          component="div"
          resource="PushNotificationReceipt"
          basePath="/notifications"
          sort={{ field: "sentAt", order: "DESC" }}
        >
          <Datagrid>
            <SinceDateField source="sentAt" label="Sent At" />
            <TextField source="title" label="Title" />
            <TextField source="body" label="Body" />
            <TextField source="route" label="Route" />
            <TextField source="screen" label="Screen" />
            <TextField source="uri" label="URI" />
            <TextField source="interest" label="Interest" />
            <UsersField label="Users" />
          </Datagrid>
        </List>
      </Card>

      <SendPushNotificationModal onClose={handleEditClose} open={openEdit} />
    </Container>
  )
}
