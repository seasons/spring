import React from "react"
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  DateField,
  ArrayField,
  SingleFieldList,
  ReferenceField,
  TextField,
  EditButton,
  DisabledInput,
  TextInput,
  LongTextInput,
  DateInput,
} from "react-admin"
import { ImagesField } from "./Fields/ImagesField"

export const ProductList = props => (
  <List {...props}>
    <Datagrid>
      <ImagesField source="images" />
      <TextField source="name" />
      <ReferenceField source="brand.id" reference="Brand" label="Brand Name">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="category.name" label="Category Name" />
    </Datagrid>
  </List>
)
