import React from "react"
import { List, Datagrid, DateField, TextField, ImageField } from "react-admin"

export const BrandList = props => (
  <List
    {...props}
    perPage={10}
    hasCreate={false}
    hasEdit={false}
    hasList={true}
    hasShow={true}
    resource={"Brand"}
    title="Brands"
  >
    <Datagrid>
      <TextField source="name" />
      <TextField source="brandCode" />
      <ImageField source="logo.thumbnails.small.url" />
      <TextField source="tier" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
)
