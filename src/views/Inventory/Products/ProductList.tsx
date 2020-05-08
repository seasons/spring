import { Header } from "components/Header"
import { ImagesField } from "fields"
import React from "react"
import {
  Datagrid,
  EditButton,
  Filter,
  List,
  ReferenceArrayInput,
  ReferenceField,
  SelectArrayInput,
  TextField,
  TextInput,
} from "react-admin"

export const ProductFilter = props => (
  <Filter {...props}>
    <TextInput label="Search by name" source="name_contains" options={{ variant: "outlined" }} />
    <ReferenceArrayInput label="Brands" source="brand" reference="Brand">
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>
  </Filter>
)

export interface ProductListInterface {
  onNewProductBtnPressed: () => void
}

export const ProductList: React.FC<ProductListInterface> = ({ onNewProductBtnPressed, ...rest }) => (
  <>
    <Header title="Products" newEntityText="New Product" newEntityHandler={onNewProductBtnPressed} />
    <List
      filters={<ProductFilter />}
      {...rest}
      perPage={10}
      hasCreate={false}
      hasEdit={false}
      hasList
      hasShow
      resource="Product"
    >
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
  </>
)
