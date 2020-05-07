import { ProductItemsField, StatusField, ViewEntityField } from "fields"
import React from "react"
import { Datagrid, TextField } from "react-admin"

import { Container } from "@material-ui/core"

import { MemberSubViewProps } from "../interfaces"

export const HistoryView: React.FC<MemberSubViewProps> = ({ member }) => {
  let normalizedReservations = {}
  member?.reservations?.forEach(res => (normalizedReservations[res.id] = res))
  const defaultSort = { field: "reservationNumber", order: "ASC" }

  return (
    <>
      <Container maxWidth={false}>
        <Datagrid ids={member.reservationsIds} data={normalizedReservations} currentSort={defaultSort}>
          <TextField source="reservationNumber" label="Order #" />
          <StatusField label="Order Status" />
          <TextField source="receivedAt" label="Date Placed" />
          <TextField source="shippedAt" label="Date Returned" />
          <ProductItemsField source="productVariant.product.images" label="Items" />
          <ViewEntityField entityPath="members" entityTab="account" source="id" label="Actions" />
        </Datagrid>
      </Container>
    </>
  )
}
