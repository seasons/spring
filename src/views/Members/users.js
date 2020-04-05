// in src/users.js
import React from "react"
import { List, Datagrid, TextField, EmailField } from "react-admin"

export const UserList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="auth0Id" />
      <EmailField source="email" />
      <TextField source="role" />
    </Datagrid>
  </List>
)
