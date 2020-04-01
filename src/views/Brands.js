import React from "react"
import { List, Datagrid, DateField, TextField, ImageField } from "react-admin"

export const BrandList = props => (
  <List {...props}>
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
