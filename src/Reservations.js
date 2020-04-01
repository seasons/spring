import React from "react"
import { List, Datagrid, TextField, ReferenceField, ReferenceArrayField, SingleFieldList } from "react-admin"

export const ReservationsList = props => (
  <List {...props} title="Reservations">
    <Datagrid>
      <TextField source="id" />
      <TextField source="reservationNumber" />
      <ReferenceField source="user.id" reference="User" label="User Email">
        <TextField source="email" />
      </ReferenceField>
      <ReferenceArrayField label="Products" reference="PhysicalProduct" source="physicalproduct.id">
        <SingleFieldList>
          <TextField source="seasonsUID" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ReferenceField source="customer.id" reference="Customer" label="Customer Email">
        {/* TODO: Get a link to customer working */}
        <TextField source="user.email" />
      </ReferenceField>
      <ReferenceField source="sentPackage.id" reference="Package">
        <TextField source="id" />
      </ReferenceField>
      <ReferenceField source="returnedPackage.id" reference="Package">
        <TextField source="id" />
      </ReferenceField>
    </Datagrid>
  </List>
)
