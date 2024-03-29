import React from "react"
import { Datagrid, List, TextField } from "@seasons/react-admin"

export const SizeList = props => (
  <List
    {...props}
    perPage={25}
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
