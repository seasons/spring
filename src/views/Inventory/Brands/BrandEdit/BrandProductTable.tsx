import { BrandField, CheckField, ImagesField, SinceDateField, ViewEntityField } from "fields"
import React from "react"
import { Datagrid, List, TextField } from "@seasons/react-admin"
import { Typography } from "@material-ui/core"

export const BrandProductTable = ({ brand }) => {
  if (brand?.productsConnection?.aggregate?.count === 0) {
    return <></>
  }

  return (
    <>
      <Typography variant="h3">Products</Typography>
      <List
        sort={{ field: "publishedAt", order: "DESC" }}
        filter={{ brand: { id: brand?.id } }}
        perPage={25}
        hasCreate={false}
        hasEdit={false}
        exporter={() => {}}
        hasList
        hasShow
        basePath="/inventory/products"
        resource="Product"
      >
        <Datagrid>
          <ImagesField source="images" />
          <TextField source="name" />
          <BrandField label="Brand" />
          <TextField source="category.name" label="Category" />
          <SinceDateField source="publishedAt" label="Published" />
          <CheckField source="status" value="Available" />
          <TextField source="photographyStatus" label="Photography" />
          <ViewEntityField source="id" entityPath="inventory/products" label="Actions" />
        </Datagrid>
      </List>
    </>
  )
}
