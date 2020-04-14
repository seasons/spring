import React from "react"
import { Datagrid, List, ReferenceField, TextField } from "react-admin"

export const CustomerList = props => {
  console.log(props)

  return (
    <List
      {...props}
      perPage={10}
      hasCreate={false}
      hasEdit={false}
      hasList={true}
      hasShow={true}
      resource={"Customer"}
      title="Customers"
    >
      <Datagrid>
        <TextField source="id" />
        <ReferenceField source="user.id" reference="User" label="User Email">
          <TextField source="email" />
        </ReferenceField>
      </Datagrid>
    </List>
  )
}
