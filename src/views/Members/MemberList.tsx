import { Header } from "components/Header"
import { EntityCountField, FullNameField, StatusField, ViewEntityField } from "fields"
import React, { useState } from "react"
import { Datagrid, List, TextField } from "@seasons/react-admin"

import { Card, Container } from "@material-ui/core"

import { MemberFilter } from "./MemberFilter"

import { MemberCreateModal } from "./MemberCreate"

export interface MemberListProps {
  history: any
  match: any
  props?: any
}

export const MemberList: React.FunctionComponent<MemberListProps> = ({ match, history, props }) => {
  const [openEdit, setOpenEdit] = useState(false)
  const createNewMember = () => {
    setOpenEdit(true)
  }

  const handleEditClose = () => {
    setOpenEdit(false)
  }

  return (
    <Container maxWidth={false}>
      <Header
        title="Members"
        primaryButton={{ text: "Create Member", action: createNewMember }}
        breadcrumbs={[
          {
            title: "Members",
            url: "/members",
          },
        ]}
      />
      <Card>
        <List
          {...props}
          filters={<MemberFilter />}
          perPage={10}
          hasCreate={false}
          hasEdit={false}
          hasList={true}
          hasShow={true}
          component="div"
          resource="Customer"
          basePath="/members"
          sort={{ field: "id", order: "DESC" }}
        >
          <Datagrid>
            <FullNameField label="Name" />
            <TextField source="detail.shippingAddress.city" label="City" />
            <TextField source="detail.shippingAddress.state" label="State" />
            <TextField source="plan" label="Membership" />
            <StatusField label="Status" />
            <TextField source="bagItems.id" label="Money Spent" />
            <EntityCountField label="Current Items" entityName="bagItems" />
            <ViewEntityField entityPath="members" entityTab="account" source="id" label="Actions" />
          </Datagrid>
        </List>
      </Card>

      <MemberCreateModal onClose={handleEditClose} open={openEdit} />
    </Container>
  )
}
