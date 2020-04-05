import React from "react"
import { List, Datagrid, TextField } from "react-admin"

export const SizeList = props => (
  <List
    {...props}
    perPage={10}
    hasCreate={false}
    hasEdit={false}
    hasList={true}
    hasShow={true}
    resource={"Size"}
    title="Sizes"
  >
    <Datagrid>
      <TextField source="slug" />
      <TextField source="productType" />
      <TextField source="display" />
    </Datagrid>
  </List>
)
