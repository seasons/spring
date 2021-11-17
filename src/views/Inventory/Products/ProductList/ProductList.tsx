import { Header, Spacer } from "components"
import { BrandField, CheckField, ImagesField, SinceDateField, ViewEntityField } from "fields"
import React, { useState } from "react"
import { Datagrid, List, TextField, useRefresh } from "@seasons/react-admin"
import { ProductListActions } from "./ProductListActions"
import { ProductFilter } from "./ProductFilter"
import { ExpandedRow } from "./ExpandedRow"
import { PrintBarcodesModal } from "./PrintBarcodesModal"
import { UpdatePhysicalProductStatusModal } from "./UpdatePhysicalProductStatusModal"
import { useMutation } from "react-apollo"
import { StowProductModal } from "../Components"
import { BulkPublishButton } from "./BulkPublishButton"
import { OffloadPhysicalProductModal } from "views/Inventory/PhysicalProducts/Components"
import { UPDATE_PHYSICAL_PRODUCT } from "views/Inventory/PhysicalProducts/mutations"
import { useSnackbarContext } from "components/Snackbar"
import { StowMultiProductsModal } from "../Components"
import { DraftProductList } from "./DraftProductList"

export interface ProductListInterface {
  onNewProductBtnPressed: () => void
}

export const ProductList: React.FC<ProductListInterface> = ({ onNewProductBtnPressed, ...rest }) => {
  const refresh = useRefresh()
  const [openPrintBarcodesModal, togglePrintBarcodesModal] = useState(false)
  const [openStowProductModal, toggleStowProductModal] = useState(false)
  const [openStowMultiProductsModal, toggleStowMultiProductsModal] = useState(false)
  const [updatingStatusForPhysicalProduct, setUpdatingStatusForPhysicalProduct] = useState<any>(null)
  const [offloadingPhysicalProduct, setOffloadingPhysicalProduct] = useState<any>(null)
  const [isMutating, setIsMutating] = useState(false)

  const { showSnackbar } = useSnackbarContext()
  const [updatePhysicalProduct] = useMutation(UPDATE_PHYSICAL_PRODUCT, {
    onCompleted: result => {
      showSnackbar({
        message: `Successfully updated status for physical product ${result.updatePhysicalProduct.seasonsUID}.`,
        status: "success",
      })
    },
    onError: error => {
      showSnackbar({
        message: error?.message,
        status: "error",
      })
    },
  })

  return (
    <>
      <Header title="Products" primaryButton={{ text: "New Product", action: onNewProductBtnPressed }} />
      <DraftProductList />
      <List
        {...rest}
        filters={<ProductFilter />}
        actions={
          <ProductListActions
            onClickPrintBarcodes={() => togglePrintBarcodesModal(true)}
            onClickStowProduct={() => toggleStowProductModal(true)}
            onClickStowMultiProducts={() => toggleStowMultiProductsModal(true)}
          />
        }
        sort={{ field: "publishedAt", order: "DESC" }}
        bulkActionButtons={<BulkPublishButton />}
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
          <SinceDateField source="publishedAt" label="Published" />
          <CheckField source="status" value="Available" />
          <TextField source="photographyStatus" label="Photography" />
          <ViewEntityField source="id" entityPath="inventory/products" label="Actions" />
        </Datagrid>
      </List>
      <Spacer mt={6} />

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
      />
      <StowMultiProductsModal
        open={openStowMultiProductsModal}
        onClose={() => {
          toggleStowMultiProductsModal(false)
        }}
      />

      <UpdatePhysicalProductStatusModal
        open={!!updatingStatusForPhysicalProduct}
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
          showSnackbar({
            message: `Successfully offloaded physical product ${offloadingPhysicalProduct.seasonsUID}.`,
            status: "success",
          })
          setOffloadingPhysicalProduct(null)
          refresh()
        }}
        physicalProduct={offloadingPhysicalProduct}
      />
    </>
  )
}
