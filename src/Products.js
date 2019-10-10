import React from "react";
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  DateField,
  ReferenceField,
  TextField,
  EditButton,
  DisabledInput,
  TextInput,
  LongTextInput,
  DateInput
} from "react-admin";

export const ProductList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="name" />
      <ReferenceField source="brand.id" reference="Brand" label="Brand Name">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="category.name" label="Category Name" />
    </Datagrid>
  </List>
);
