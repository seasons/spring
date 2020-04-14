import React from "react"
import { Datagrid, DateField, ImageField, List, TextField } from "react-admin"

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
      <TextField source="name" label="Name" />
      <TextField source="brandCode" label="Code" />
      <ImageField source="logo.thumbnails.small.url" label="Image" />
      <TextField source="tier" label="Tier" />
      <DateField source="createdAt" label="CreatedAt" />
      <DateField source="updatedAt" label="UpdatedAt" />
    </Datagrid>
  </List>
)
