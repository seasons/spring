import React, { useState } from "react"
import { Datagrid, DateField, Filter, List, TextField, TextInput } from "@seasons/react-admin"
import { Header, Snackbar } from "components"
import { BrandCreateModal } from "./BrandCreateModal"
import { SnackbarState } from "components/Snackbar"

export const BrandFilter = props => (
  <Filter {...props}>
    <TextInput label="Search by name" source="name_contains" options={{ variant: "outlined" }} alwaysOn />
  </Filter>
)

export const BrandList = props => {
  const [brandCreateModalOpen, setBrandCreateModalOpen] = useState(false)
  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })
  return (
    <>
      <Header
        title="Brands"
        primaryButton={{
          text: "New Brand",
          action: () => setBrandCreateModalOpen(!brandCreateModalOpen),
        }}
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
      <BrandCreateModal
        open={brandCreateModalOpen}
        onClose={() => setBrandCreateModalOpen(false)}
        toggleSnackbar={toggleSnackbar}
      />
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </>
  )
}
