import React from "react"
import { Datagrid, DateField, Filter, ImageField, List, TextField, TextInput } from "@seasons/react-admin"
import { Header } from "components/Header"

export const BrandFilter = props => (
  <Filter {...props}>
    <TextInput label="Search by name" source="name_contains" options={{ variant: "outlined" }} alwaysOn />
  </Filter>
)

export const BrandList = props => {
  return (
    <>
      <Header
        title="Brands"
        primaryButton={{ text: "New Brand" }}
        breadcrumbs={[
          {
            title: "Brands",
            url: "/brands",
          },
        ]}
      />
      <List
        {...props}
        filters={<BrandFilter />}
        exporter={false}
        perPage={10}
        hasCreate={false}
        hasEdit={false}
        hasList={true}
        hasShow={true}
        resource="Brand"
        title="Brands"
      >
        <Datagrid>
          <TextField source="name" label="Name" />
          <TextField source="brandCode" label="Code" />
          <TextField source="tier" label="Tier" />
          <DateField source="createdAt" label="CreatedAt" />
          <DateField source="updatedAt" label="UpdatedAt" />
        </Datagrid>
      </List>
    </>
  )
}
