import { Header } from "components/Header"
import { BrandField, CheckField, ImagesField, SinceDateField, ViewEntityField } from "fields"
import React from "react"
import { Datagrid, Filter, List, SelectInput, TextField, TextInput } from "@seasons/react-admin"
import { Box, Grid } from "@material-ui/core"
import { VariantSummary } from "./Components"
import jsonExport from "jsonexport/dist"

export const ProductFilter = props => (
  <Filter {...props}>
    <TextInput label="Search by name" source="name_contains" options={{ variant: "outlined" }} alwaysOn />
    <SelectInput
      label="Publish status"
      source="status"
      choices={[
        { id: "Available", name: "Published" },
        { id: "NotAvailable", name: "Not Published" },
        { id: "Stored", name: "Stored" },
        { id: "Offloaded", name: "Offloaded" },
      ]}
      alwaysOn
    />
    <SelectInput
      label="Photography"
      source="photographyStatus"
      choices={[
        { id: "Done", name: "Done" },
        { id: "InProgress", name: "In progress" },
        { id: "ReadyForEditing", name: "Ready for editing" },
        { id: "ReadyToShoot", name: "Ready to shoot" },
        { id: "Steam", name: "Steam" },
      ]}
      alwaysOn
    />
  </Filter>
)

export interface ProductListInterface {
  onNewProductBtnPressed: () => void
}

interface ExpandedRowProps {
  id?: string
  record?: any
  resource?: string
}

const ExpandedRow: React.FC<ExpandedRowProps> = ({ id, record, resource }) => {
  return (
    <Box my={2}>
      <Grid container spacing={3}>
        {record?.variants.map((variant, index) => (
          <Grid item md={4}>
            <VariantSummary variant={variant} key={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
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
      currentSort={{ field: "createdAt", order: "ASC" }}
      perPage={10}
      hasCreate={false}
      hasEdit={false}
      exporter={false}
      hasList
      hasShow
      resource="Product"
    >
      <Datagrid expand={<ExpandedRow />}>
        <ImagesField source="images" />
        <TextField source="name" />
        <BrandField label="Brand Name" />
        <TextField source="category.name" label="Category Name" />
        <SinceDateField source="createdAt" label="Created" />
        <CheckField source="status" value="Available" label="Published" />
        <TextField source="photographyStatus" label="Photography" />
        <ViewEntityField source="id" entityPath="inventory/products" label="Actions" />
      </Datagrid>
    </List>
  </>
)
