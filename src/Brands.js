import React from "react";
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  DateField,
  TextField,
  ImageField,
  EditButton,
  DisabledInput,
  TextInput,
  LongTextInput,
  DateInput,
  UrlField
} from "react-admin";

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
);
