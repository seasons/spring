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
import { GET_LIST } from "react-admin"
import gql from "graphql-tag"
import queries from "queries/Reservation"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import Checkbox from "@material-ui/core/Checkbox"
import { StatusField, SinceDateField, MemberField } from "fields"

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
        <StatusField label="Status" />
        <SinceDateField source="createdAt" label="Created" />
        <MemberField label="Member" />
      </MyDatagrid>
    </List>
  )
}
