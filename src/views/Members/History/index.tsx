import { ProductItemsField, SinceDateField, StatusField, ViewEntityField } from "fields"
import React from "react"
import { Datagrid, TextField } from "@seasons/react-admin"

import { Container } from "@material-ui/core"

import { MemberSubViewProps } from "../interfaces"

export const HistoryView: React.FC<MemberSubViewProps> = ({ member }) => {
  let normalizedReservations = {}
  member?.reservations?.forEach(res => (normalizedReservations[res.id] = res))
  const defaultSort = { field: "reservationNumber", order: "ASC" }

  return (
    <>
      <Container maxWidth={false}>
        <Datagrid ids={member?.reservations?.map(r => r.id)} data={normalizedReservations} currentSort={defaultSort}>
          <TextField source="reservationNumber" label="Order #" />
          <StatusField label="Order Status" />
          <SinceDateField source="receivedAt" label="Date Placed" />
          <SinceDateField source="shippedAt" label="Date Returned" />
          <ProductItemsField source="productVariant.product.images" label="Items" />
          <ViewEntityField entityPath="reservation" source="id" label="Actions" />
        </Datagrid>
      </Container>
    </>
  )
}
