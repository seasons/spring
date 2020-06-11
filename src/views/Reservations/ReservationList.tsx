import React, { useContext } from "react"
import { Datagrid, Filter, Loading, List, DataProviderContext, TextInput } from "@seasons/react-admin"
import { StatusField, SinceDateField, MemberField, ViewEntityField, ImagesField } from "fields"
import { Box, Container, Card } from "@material-ui/core"
import { Header, StatusInput } from "components"

const Filters = props => (
  <Box px={2}>
    <Filter {...props}>
      <TextInput label="Search name" source="customer.user.firstName_contains" alwaysOn />
      <StatusInput
        source="status_in"
        tabs={[
          { label: "All", id: "all", value: [] },
          {
            label: "Unfulfilled",
            id: "unfulfilled",
            value: ["New", "InQueue", "OnHold", "Packed"],
          },
          {
            label: "Fulfilled",
            id: "fulfilled",
            value: ["Shipped", "InTransit", "Received", "Completed"],
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
      <Card>
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
          component="div"
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
      </Card>
    </Container>
  )
}
