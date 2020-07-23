import React from "react"
import { Datagrid, List, ReferenceField, TextField } from "@seasons/react-admin"

export const TagList = props => (
  <List
    {...props}
    perPage={25}
    hasCreate={false}
    hasEdit={false}
    hasList={true}
    hasShow={true}
    resource={"Product"}
    title="Tags"
  >
    <Datagrid>
      <ReferenceField source="product.tags" reference="Product" label="Tags">
        <TextField source="tags" />
      </ReferenceField>
    </Datagrid>
  </List>
)
