import React, { useContext } from "react"
import { Datagrid, Filter, Loading, List, DataProviderContext, SelectInput, TextInput } from "@seasons/react-admin"
import { StatusField, SinceDateField, MemberField, ViewEntityField, ImagesField } from "fields"
import { Box, Container, Card } from "@material-ui/core"
import { Header } from "components/Header"
import { StatusInput } from "./Components/StatusInput"

const Filters = props => (
  <Box px={2}>
    <Filter {...props}>
      <TextInput label="Search name" source="customer.user.firstName_contains" alwaysOn />
      <SelectInput
        label="Status"
        source="status"
        choices={[
          {},
          { id: "Queued", name: "Queued" },
          { id: "Packed", name: "Packed" },
          { id: "Shipped", name: "Shipped" },
          { id: "Delivered", name: "Delivered" },
          { id: "Completed", name: "Completed" },
          { id: "Cancelled", name: "Cancelled" },
          { id: "Blocked", name: "Blocked" },
        ]}
        alwaysOn
      />
      <StatusInput
        source="status_in"
        tabs={[
          { label: "All", id: "all", value: [] },
          {
            label: "Outgoing",
            id: "outgoing",
            value: ["Queued", "Packed", "Shipped"],
          },
          {
            label: "Incoming",
            id: "incoming",
            value: ["Shipped", "Delivered", "Completed"],
          },
        ]}
        alwaysOn
      />
    </Filter>
  </Box>
)

export const ReservationList = ({ staticContext, ...props }) => {
  const dataProvider = useContext(DataProviderContext)

  if (!dataProvider) {
    return <Loading />
  }

  return (
    <Container maxWidth={false}>
      <Header
        title="Reservations"
        breadcrumbs={[
          {
            title: "Reservations",
            url: "/reservations",
          },
        ]}
      />
      <Box mb={2}>
        <List
          {...props}
          filters={<Filters />}
          hasCreate={false}
          hasEdit={false}
          hasList={true}
          hasShow={true}
          exporter={false}
          perPage={10}
          sort={{
            field: "createdAt",
            order: "DESC",
          }}
          resource="Reservation"
          title="Reservations"
        >
          <Datagrid>
            <SinceDateField source="createdAt" label="Created" />
            <ImagesField source="images" label="Images" size="medium" />
            <StatusField label="Status" />
            <MemberField label="Member" />
            <SinceDateField source="returnAt" label="Return" />
            <ViewEntityField entityPath="reservation" source="id" label="Actions" />
          </Datagrid>
        </List>
      </Box>
    </Container>
  )
}
