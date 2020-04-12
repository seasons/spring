import { FullNameField } from 'fields/FullNameField';
import React from 'react';
import { Datagrid, List, ReferenceField, TextField } from 'react-admin';

export const CustomerList = props => {
  return (
    <List
      {...props}
      perPage={15}
      hasCreate={false}
      hasEdit={false}
      hasList={true}
      hasShow={true}
      resource={"Customer"}
      title="Customers"
    >
      <Datagrid>
        <FullNameField label="Name" />
        <TextField source="detail.shippingAddress.city" label="City" />
        <TextField source="detail.shippingAddress.state" label="State" />
        <TextField source="plan" label="Membership" />
        <TextField source="status" label="Status" />
      </Datagrid>
    </List>
  )
}
