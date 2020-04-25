import { StatusField, ViewEntityField } from "fields"
import React from "react"
import { Datagrid, Error, Loading, TextField, useQuery } from "react-admin"

import { Container } from "@material-ui/core"

export const HistoryView: React.FC = props => {
  const { data, loading, error } = useQuery({
    type: "getOne",
    resource: "Customer",
    payload: { id: "ck2ge3c2c06cf07577w6h298c" },
  })

  if (loading) return <Loading />
  if (error) return <Error />
  if (!data) return null

  console.log("\n\n data is ", data)
  let normalizedReservations = {}
  data.reservations.forEach(res => (normalizedReservations[res.id] = res))
  const defaultSort = { field: "reservationNumber", order: "ASC" }

  return (
    <>
      <Container maxWidth={false}>
        <Datagrid ids={data.reservationsIds} data={normalizedReservations} currentSort={defaultSort}>
          <TextField source="reservationNumber" label="Order #" />
          <StatusField label="Order Status" />
          <TextField source="receivedAt" label="Date Placed" />
          <TextField source="shippedAt" label="Date Returned" />
          <TextField source="reservationNumber" label="Items" />
          <ViewEntityField entityPath="members" entityTab="account" source="id" label="Actions" />
        </Datagrid>
      </Container>
    </>
  )
}
