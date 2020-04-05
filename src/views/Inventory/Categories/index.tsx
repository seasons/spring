import React from "react"
import { List, Datagrid, TextField } from "react-admin"

export const CategoryList = props => (
  <List
    {...props}
    perPage={10}
    hasCreate={false}
    hasEdit={false}
    hasList={true}
    hasShow={true}
    resource={"Category"}
    title="Categories"
  >
    <Datagrid>
      <TextField source="name" />
    </Datagrid>
  </List>
)
