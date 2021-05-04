import React, { useContext } from "react"
import {
  Datagrid,
  Filter,
  FunctionField,
  Loading,
  List,
  DataProviderContext,
  SelectInput,
  TextInput,
} from "@seasons/react-admin"
import { StatusField, SinceDateField, MemberField, ViewEntityField, ImagesField } from "fields"
import { Box, Container } from "@material-ui/core"
import { Header, StatusInput } from "components"
import { PhaseField } from "fields/PhaseField"

const Filters: React.FC<any> = ({ modifiedSinceLastSubmit, ...rest }) => {
  return (
    <Box px={2}>
      <Filter {...rest}>
        <TextInput label="Search name" source="user.firstName_contains" alwaysOn />
        <SelectInput
          label="Status"
          source="status"
          choices={[
            { id: "Queued", name: "Queued" },
            { id: "Picked", name: "Picked" },
            { id: "Packed", name: "Packed" },
            { id: "Shipped", name: "Shipped" },
            { id: "Delivered", name: "Delivered" },
            { id: "Completed", name: "Completed" },
            { id: "Cancelled", name: "Cancelled" },
            { id: "Hold", name: "Hold" },
            { id: "Blocked", name: "Blocked" },
          ]}
          alwaysOn
        />
        <StatusInput
          source="phase"
          tabs={[
            { label: "All", id: "all", value: [] },
            {
              label: "Outgoing",
              id: "outgoing",
              value: "BusinessToCustomer",
            },
            {
              label: "Incoming",
              id: "incoming",
              value: "CustomerToBusiness",
            },
          ]}
          alwaysOn
        />
      </Filter>
    </Box>
  )
}

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
          perPage={25}
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
            <SinceDateField source="statusUpdatedAt" label="Status Last Updated" />
            {/* <SinceDateField source="returnAt" label="Return" /> */}
            <FunctionField label="Reservations" render={record => record?.customer.reservations.length} />
            <PhaseField source="phase" />
            <ViewEntityField entityPath="reservation" entityTab="overview" source="id" label="Actions" />
          </Datagrid>
        </List>
      </Box>
    </Container>
  )
}
