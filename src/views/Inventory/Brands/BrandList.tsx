import React, { useState } from "react"
import { Datagrid, DateField, List, TextField } from "@seasons/react-admin"
import { Header, Snackbar } from "components"
import { SnackbarState } from "components/Snackbar"
import { useHistory } from "react-router-dom"
import { ViewEntityField } from "fields"

export const BrandList = props => {
  const history = useHistory()
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
          action: () => history.push("/inventory/brands/new"),
        }}
      />
      <List
        {...props}
        exporter={false}
        perPage={25}
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
          <ViewEntityField source="id" entityPath="inventory/brands" label="Actions" />
        </Datagrid>
      </List>
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </>
  )
}
