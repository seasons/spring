import React from "react"
import { List, Datagrid, TextField, ReferenceField } from "react-admin"

export const CustomerList = props => (
  <List {...props} title="Customers">
    <Datagrid>
      <TextField source="id" />
      <ReferenceField source="user.id" reference="User" label="User Email">
        <TextField source="email" />
      </ReferenceField>
    </Datagrid>
  </List>
)
