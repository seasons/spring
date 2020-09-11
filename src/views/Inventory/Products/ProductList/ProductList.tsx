import { Snackbar, Header } from "components"
import { BrandField, CheckField, ImagesField, SinceDateField, ViewEntityField } from "fields"
import { SnackbarState } from "components/Snackbar"
import React, { useState } from "react"
import { Datagrid, List, TextField, useRefresh } from "@seasons/react-admin"
import { ProductListActions } from "./ProductListActions"
import { ProductFilter } from "./ProductFilter"
import { ExpandedRow } from "./ExpandedRow"
import { PrintBarcodesModal } from "./PrintBarcodesModal"
import { UpdatePhysicalProductStatusModal } from "./UpdatePhysicalProductStatusModal"
import { useMutation } from "react-apollo"
import { StowProductModal, ProductVariantsSection } from "../Components"
import { BulkPublishButton } from "./BulkPublishButton"
import { OffloadPhysicalProductModal } from "views/Inventory/PhysicalProducts/Components"
import { UPDATE_PHYSICAL_PRODUCT } from "views/Inventory/PhysicalProducts/mutations"
import PhysicalProduct from "queries/PhysicalProduct"
import {
  ProductEditQuery_product_variants,
  ProductEditQuery_product_variants_physicalProducts,
} from "generated/ProductEditQuery"

export interface ProductListInterface {
  onNewProductBtnPressed: () => void
}

export const ProductList: React.FC<ProductListInterface> = ({ onNewProductBtnPressed, ...rest }) => {
  const refresh = useRefresh()
  const [openPrintBarcodesModal, togglePrintBarcodesModal] = useState(false)
  const [openStowProductModal, toggleStowProductModal] = useState(false)
  const [updatingStatusForPhysicalProduct, setUpdatingStatusForPhysicalProduct] = useState<any>(null)
  const [offloadingPhysicalProduct, setOffloadingPhysicalProduct] = useState<any>(null)
  const [isMutating, setIsMutating] = useState(false)
  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })

  const [updatePhysicalProduct] = useMutation(UPDATE_PHYSICAL_PRODUCT, {
    onCompleted: result => {
      toggleSnackbar({
        show: true,
        message: `Successfully updated status for physical product ${result.updatePhysicalProduct.seasonsUID}.`,
        status: "success",
      })
    },
    onError: error => {
      toggleSnackbar({
        show: true,
        message: error?.message,
        status: "error",
      })
    },
  })
  // Need to adjust logic here
  const totalNum = (variant: ProductEditQuery_product_variants) => {
    return variant.physicalProducts?.length
  }

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
        actions={
          <ProductListActions
            onClickPrintBarcodes={() => togglePrintBarcodesModal(true)}
            onClickStowProduct={() => toggleStowProductModal(true)}
          />
        }
        sort={{ field: "publishedAt", order: "DESC" }}
        bulkActionButtons={<BulkPublishButton toggleSnackbar={toggleSnackbar} />}
        perPage={25}
        hasCreate={false}
        hasEdit={false}
        exporter={() => {}}
        hasList
        hasShow
        resource="Product"
      >
        <Datagrid
          expand={
            <ExpandedRow
              setUpdatingStatusForPhysicalProduct={setUpdatingStatusForPhysicalProduct}
              setOffloadingPhysicalProduct={setOffloadingPhysicalProduct}
            />
          }
        >
          <ImagesField source="images" />
          <TextField source="name" />
          <BrandField label="Brand" />
          <TextField source="category.name" label="Category" />
          <TextField source={totalNum} label="Total Count" />
          <SinceDateField source="publishedAt" label="Published" />
          <CheckField source="status" value="Available" />
          <TextField source="photographyStatus" label="Photography" />
          <ViewEntityField source="id" entityPath="inventory/products" label="Actions" />
        </Datagrid>
      </List>

      <PrintBarcodesModal
        open={openPrintBarcodesModal}
        onClose={() => {
          togglePrintBarcodesModal(false)
        }}
        onSave={() => {
          togglePrintBarcodesModal(false)
        }}
      />

      <StowProductModal
        open={openStowProductModal}
        onClose={() => {
          toggleStowProductModal(false)
        }}
        onSave={() => {
          toggleStowProductModal(false)
        }}
      />

      <UpdatePhysicalProductStatusModal
        open={!!updatingStatusForPhysicalProduct}
        toggleSnackbar={toggleSnackbar}
        physicalProduct={updatingStatusForPhysicalProduct}
        isMutating={isMutating}
        onSubmit={async values => {
          const { physicalProductStatus, inventoryStatus } = values
          setIsMutating(true)
          await updatePhysicalProduct({
            variables: {
              where: { id: updatingStatusForPhysicalProduct?.id },
              data: {
                productStatus: physicalProductStatus,
                inventoryStatus,
              },
            },
          })
          refresh()
          setIsMutating(false)
          setUpdatingStatusForPhysicalProduct(null)
        }}
        onClose={() => {
          setUpdatingStatusForPhysicalProduct(null)
        }}
      />

      <OffloadPhysicalProductModal
        open={!!offloadingPhysicalProduct}
        onClose={() => setOffloadingPhysicalProduct(null)}
        onSave={() => {
          toggleSnackbar({
            show: true,
            message: `Successfully offloaded physical product ${offloadingPhysicalProduct.seasonsUID}.`,
            status: "success",
          })
          setOffloadingPhysicalProduct(null)
          refresh()
        }}
        physicalProduct={offloadingPhysicalProduct}
        toggleSnackbar={toggleSnackbar}
      />

      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </>
  )
}
