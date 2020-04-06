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
      <TextField source="slug" label="Slug" />
      <TextField source="productType" label="Product Type" />
      <TextField source="display" label="Display" />
    </Datagrid>
  </List>
)
