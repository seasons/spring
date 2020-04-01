import React from "react"
import { List, Datagrid, TextField } from "react-admin"

export const CategoryList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="name" />
    </Datagrid>
  </List>
)
