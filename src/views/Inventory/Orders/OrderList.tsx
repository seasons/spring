import React, { useContext } from "react"
import { Datagrid, DataProviderContext, Loading, List, TextField } from "@seasons/react-admin"
import { Header } from "components/Header"
import { OrderFilter } from "./Components/OrderFilter"
import { MemberField, PriceField, SinceDateField, StatusField, ViewEntityField } from "fields"
import { Container } from "@material-ui/core"

export const OrderList = props => {
  const dataProvider = useContext(DataProviderContext)

  if (!dataProvider) {
    return <Loading />
  }

  return (
    <Container maxWidth={false}>
      <Header
        title="Orders"
        breadcrumbs={[
          {
            title: "Orders",
            url: "/orders",
          },
        ]}
      />
      <List
        {...props}
        sort={{ field: "createdAt", order: "DESC" }}
        filters={<OrderFilter />}
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
          <TextField source="type" label="Type" />
          <ViewEntityField entityPath="orders" source="id" label="Actions" />
        </Datagrid>
      </List>
    </Container>
  )
}
