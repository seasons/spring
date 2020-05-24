import { Header } from "components/Header"
import { BrandField, ImagesField, ViewEntityField } from "fields"
import React from "react"
import {
  Datagrid,
  Filter,
  List,
  ReferenceArrayInput,
  SelectArrayInput,
  TextField,
  TextInput,
} from "@seasons/react-admin"

export const ProductFilter = props => (
  <Filter {...props}>
    <TextInput label="Search by name" source="name_contains" options={{ variant: "outlined" }} alwaysOn />
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
    <Header
      title="Products"
      primaryButton={{ text: "New Product", action: onNewProductBtnPressed }}
      breadcrumbs={[
        {
          title: "Products",
          url: "/products",
        },
      ]}
    />
    <List
      {...rest}
      filters={<ProductFilter />}
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
        <BrandField label="Brand Name" />
        <TextField source="category.name" label="Category Name" />
        <ViewEntityField source="id" entityPath="products" label="Actions" />
      </Datagrid>
    </List>
  </>
)
