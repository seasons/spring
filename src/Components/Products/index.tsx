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
  Filter,
  ReferenceInput,
  ReferenceArrayInput,
  SelectArrayInput,
  SelectInput,
} from "react-admin"
import { ImagesField } from "../../Fields/ImagesField"

export const ProductFilter = props => (
  <Filter {...props}>
    <TextInput label="Search by name" source="name_contains" alwaysOn />
    <ReferenceArrayInput label="Brands" source="brand" reference="Brand">
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>
  </Filter>
)

export const ProductList = props => (
  <List filters={<ProductFilter />} {...props}>
    <Datagrid>
      <ImagesField source="images" />
      <TextField source="name" />
      <ReferenceField source="brand.id" reference="Brand" label="Brand Name">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="category.name" label="Category Name" />
      <EditButton />
    </Datagrid>
  </List>
)

export const ProductEdit = props => (
  <Edit title="Edit a product" {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
      <TextInput source="description" />
      <ReferenceInput source="category.id" reference="Category">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="brand.id" reference="Brand">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceArrayInput label="Attributes" source="attributesIds" reference="Attribute">
        <SelectArrayInput optionText="value" />
      </ReferenceArrayInput>
      <ReferenceArrayInput label="Options" source="optionsIds" reference="Option">
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
)
