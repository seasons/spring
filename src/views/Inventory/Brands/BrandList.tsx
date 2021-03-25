import React, { useState } from "react"
import { Datagrid, DateField, List, TextField } from "@seasons/react-admin"
import { Header, Snackbar } from "components"
import { SnackbarState } from "components/Snackbar"
import { useHistory } from "react-router-dom"
import { ViewEntityField } from "fields"
import { Typography } from "@material-ui/core"
import { brand } from "generated/brand"

const ProductsCountField = ({ record, label }: { record?: brand; label?: string }) => {
  const productCount = record?.productsConnection?.aggregate?.count || 0
  return <Typography variant="body1" color="textPrimary">{`${productCount} products`}</Typography>
}

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
          <ProductsCountField label="Products" />
          <DateField source="createdAt" label="CreatedAt" />
          <DateField source="updatedAt" label="UpdatedAt" />
          <ViewEntityField source="id" entityPath="inventory/brands" label="Actions" />
        </Datagrid>
      </List>
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </>
  )
}
