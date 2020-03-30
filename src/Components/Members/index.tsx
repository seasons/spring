// in src/users.js
import React from "react"
import { List, Datagrid, TextField, EmailField } from "react-admin"

export const MemberList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <EmailField source="email" />
      <TextField source="firstName" />
      <TextField source="lastName" />
    </Datagrid>
  </List>
)
