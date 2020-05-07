import React from "react"
import { Datagrid, DatagridBody, Filter, List, TextField } from "react-admin"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import Checkbox from "@material-ui/core/Checkbox"
import { StatusField, SinceDateField, MemberField, ViewEntityField, ImagesField } from "fields"
import { Box, Container, Chip } from "@material-ui/core"
import { Header } from "components/Header"

const MyDatagridRow: React.FC<any> = ({ record, resource, id, onToggleItem, children, selected, basePath }) => (
  <TableRow key={id}>
    {/* first column: selection checkbox */}
    <TableCell padding="none">
      <Checkbox checked={selected} onClick={() => onToggleItem(id)} />
    </TableCell>
    {/* data columns based on children */}
    {React.Children.map(children, field => (
      <TableCell key={`${id}-${field.props.source}`}>
        {React.cloneElement(field, {
          record,
          basePath,
          resource,
        })}
      </TableCell>
    ))}
  </TableRow>
)

const MyDatagridBody = props => <DatagridBody {...props} row={<MyDatagridRow />} />
const MyDatagrid = props => <Datagrid {...props} body={<MyDatagridBody />} />

const QuickFilter = ({ label, source, value }) => {
  return <Chip label={label} />
}

const SourceFilter = props => (
  <Filter {...props}>
    <QuickFilter source="status" label="New" value="New" />
  </Filter>
)

export const ReservationList = props => {
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
          filters={<SourceFilter />}
          sort={{
            field: "createdAt",
            order: "DESC",
          }}
          resource="Reservation"
          title="Reservations"
        >
          <MyDatagrid>
            <SinceDateField source="createdAt" label="Created" />
            <ImagesField source="images" label="Images" />
            <StatusField label="Status" />
            <MemberField label="Member" />
            <TextField source="reservationNumber" label="ID" />
            <SinceDateField source="returnAt" label="Return" />
            <ViewEntityField entityPath="reservation" source="id" label="Actions" />
          </MyDatagrid>
        </List>
      </Box>
    </Container>
  )
}
