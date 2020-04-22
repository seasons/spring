import React from "react"
import {
  Datagrid,
  DatagridBody,
  List,
  ReferenceArrayField,
  ReferenceField,
  SingleFieldList,
  TextField,
} from "react-admin"
import { useDataProvider, GET_LIST } from "react-admin"
import { useQuery } from "react-apollo"
import gql from "graphql-tag"
import queries from "queries/Reservation"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import Checkbox from "@material-ui/core/Checkbox"

const GetReservations = gql`
  query GetReservations {
    reservations(first: 10) {
      ...reservation
    }
  }
  ${queries[GET_LIST]}
`

const MyDatagridRow: React.FC<any> = ({ record, resource, id, onToggleItem, children, selected, basePath }) => (
  <TableRow key={id}>
    {/* first column: selection checkbox */}
    <TableCell padding="none">
      {record.selectable && <Checkbox checked={selected} onClick={() => onToggleItem(id)} />}
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

export const ReservationsList = props => {
  // const { data } = useQuery(GetReservations)

  // console.log(data)

  return (
    <List
      {...props}
      perPage={10}
      hasCreate={false}
      hasEdit={false}
      hasList={true}
      hasShow={true}
      resource="Reservation"
      title="Reservations"
    >
      <MyDatagrid>
        <TextField source="reservationNumber" label="Reservation Number" />
        <ReferenceField source="user.id" reference="User" label="User Email">
          <TextField source="email" />
        </ReferenceField>
        <ReferenceArrayField label="Product ID" reference="PhysicalProduct" source="products.id">
          <SingleFieldList>
            <TextField source="seasonsUID" />
          </SingleFieldList>
        </ReferenceArrayField>
        <ReferenceField source="customer.id" reference="Customer" label="Customer Email">
          {/* TODO: Get a link to customer working */}
          <TextField source="user.email" />
        </ReferenceField>
        <ReferenceField source="sentPackage.id" reference="Package" label="Sent Package ID">
          <TextField source="id" />
        </ReferenceField>
        <ReferenceField source="returnedPackage.id" reference="Package" label="Returned Package ID">
          <TextField source="id" />
        </ReferenceField>
      </MyDatagrid>
    </List>
  )
}
