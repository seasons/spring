import React from "react"
import {
  List,
  Datagrid,
  ReferenceField,
  TextField,
  EditButton,
  TextInput,
  Filter,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin"
import { ImagesField } from "fields/ImagesField"
import { Card } from "@material-ui/core"
import Header from "./Header"

export const ProductFilter = props => (
  <Filter {...props}>
    <TextInput label="Search by name" source="name_contains" alwaysOn />
    <ReferenceArrayInput label="Brands" source="brand" reference="Brand">
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>
  </Filter>
)

export const ProductList = props => (
  <>
    <Card>
      <Header />
      <List
        filters={<ProductFilter />}
        {...props}
        perPage={10}
        hasCreate={false}
        hasEdit={false}
        hasList={true}
        hasShow={true}
        resource={"Product"}
      >
        <Datagrid>
          <ImagesField source="images" label="Images" />
          <TextField source="name" />
          <ReferenceField source="brand.id" reference="Brand" label="Brand Name">
            <TextField source="name" />
          </ReferenceField>
          <TextField source="category.name" label="Category Name" />

          <EditButton />
        </Datagrid>
      </List>
    </Card>
  </>
)
