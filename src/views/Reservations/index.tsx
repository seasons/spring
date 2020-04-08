import React from 'react';
import {
    Datagrid, List, ReferenceArrayField, ReferenceField, SingleFieldList, TextField
} from 'react-admin';

export const ReservationsList = props => (
  <List
    {...props}
    perPage={10}
    hasCreate={false}
    hasEdit={false}
    hasList={true}
    hasShow={true}
    resource={"Reservation"}
    title="Reservations"
  >
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="reservationNumber" label="Reservation Number" />
      <ReferenceField source="user.id" reference="User" label="User Email">
        <TextField source="email" />
      </ReferenceField>
      <ReferenceArrayField label="Product ID" reference="PhysicalProduct" source="physicalproduct.id">
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
    </Datagrid>
  </List>
)
