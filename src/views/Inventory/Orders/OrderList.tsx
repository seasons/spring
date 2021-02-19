import React from "react"
import { Datagrid, List, TextField } from "@seasons/react-admin"
import { Header } from "components/Header"
import { MemberField, PriceField, SinceDateField, StatusField, ViewEntityField } from "fields"

export const OrderList = props => (
  <>
    <Header title="Orders" />
    <List
      {...props}
      perPage={25}
      hasCreate={false}
      hasEdit={false}
      hasList={true}
      hasShow={true}
      resource={"Order"}
      title="Orders"
    >
      <Datagrid>
        <SinceDateField source="createdAt" label="Created" />
        <TextField source="orderNumber" label="Order ID" />
        <MemberField label="Member" />
        <PriceField label="Total" source="total" />
        <StatusField label="Status" />
        <ViewEntityField entityPath="inventory/orders" source="id" label="Actions" />
      </Datagrid>
    </List>
  </>
)
