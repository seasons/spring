import React, { useContext } from "react"
import { Datagrid, Filter, Loading, List, DataProviderContext } from "react-admin"
import { StatusField, SinceDateField, MemberField, ViewEntityField, ImagesField } from "fields"
import { Box, Container } from "@material-ui/core"
import { Header } from "components/Header"
import { StatusInput } from "./Components/StatusInput"

const Filters = props => (
  <Filter {...props}>
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
)

export const ReservationList = ({ staticContext, ...props }) => {
  const dataProvider = useContext(DataProviderContext)

  if (!dataProvider) {
    return <Loading />
  }

  return (
    <Container maxWidth={false}>
      <Box py={2}>
        <Header
          title="Reservations"
          breadcrumbs={[
            {
              title: "Reservations",
              url: "/reservations",
            },
          ]}
        />
        <List
          {...props}
          perPage={10}
          hasCreate={false}
          hasEdit={false}
          hasList={true}
          hasShow={true}
          filters={<Filters />}
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
