import { Header } from "components/Header"
import { BrandField, CheckField, ImagesField, SinceDateField, ViewEntityField } from "fields"
import React, { useState } from "react"
import { Datagrid, List, TextField } from "@seasons/react-admin"
import { ProductListActions } from "./ProductListActions"
import { ProductFilter } from "./ProductFilter"
import { ExpandedRow } from "./ExpandedRow"
import { PrintBarcodesModal } from "./PrintBarcodesModal"

export interface ProductListInterface {
  onNewProductBtnPressed: () => void
}

export const ProductList: React.FC<ProductListInterface> = ({ onNewProductBtnPressed, ...rest }) => {
  const [openModal, toggleModal] = useState(false)

  return (
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
        actions={<ProductListActions onClickPrintBarcodes={() => toggleModal(true)} />}
        currentSort={{ field: "createdAt", order: "ASC" }}
        perPage={10}
        hasCreate={false}
        hasEdit={false}
        exporter={() => {}}
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

      <PrintBarcodesModal
        open={openModal}
        onClose={() => {
          toggleModal(false)
        }}
        onSave={() => {
          toggleModal(false)
        }}
      />
    </>
  )
}
