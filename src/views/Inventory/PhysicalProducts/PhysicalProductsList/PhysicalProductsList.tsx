import { Snackbar, Header } from "components"
import { ViewEntityField } from "fields"
import { SnackbarState } from "components/Snackbar"
import React, { useState } from "react"
import { Datagrid, List, TextField, downloadCSV } from "@seasons/react-admin"
import { ExpandedRow } from "./ExpandedRow"
import { useRefresh } from "@seasons/react-admin"
import { UpdatePhysicalProductStatusModal } from "../../Products/ProductList/UpdatePhysicalProductStatusModal"
import { useMutation, useApolloClient } from "react-apollo"
import { PhysicalProductFragment } from "queries/PhysicalProduct"
import gql from "graphql-tag"
import jsonExport from "jsonexport/dist"
import moment from "moment"
import { OffloadPhysicalProductModal } from "../Components"
import { UPDATE_PHYSICAL_PRODUCT } from "../mutations"

export interface PhysicalProductsListInterface {
  onNewProductBtnPressed: () => void
}

const GET_PHYSICAL_PRODUCTS = gql`
  query GetPhysicalProducts {
    physicalProducts {
      ...PhysicalProduct
      reports {
        id
        damageType
        notes
        user {
          id
        }
      }
    }
  }

  ${PhysicalProductFragment}
`

export const PhysicalProductsList: React.FC<PhysicalProductsListInterface> = ({ onNewProductBtnPressed, ...rest }) => {
  const refresh = useRefresh()
  const [updatingStatusForPhysicalProduct, setUpdatingStatusForPhysicalProduct] = useState<any>(null)
  const [offloadingPhysicalProduct, setOffloadingPhysicalProduct] = useState<any>(null)
  const [isMutating, setIsMutating] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })
  const client = useApolloClient()

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

  return (
    <>
      <Header
        title="Physical Products"
        breadcrumbs={[
          {
            title: "Physical Products",
            url: "/physical-products",
          },
        ]}
      />
      <List
        {...rest}
        perPage={25}
        hasCreate={false}
        hasEdit={false}
        exporter={async () => {
          if (isExporting) {
            return
          }
          setIsExporting(true)
          const res = await client.query({
            query: GET_PHYSICAL_PRODUCTS,
          })
          const {
            data: { physicalProducts },
          } = res
          const data = physicalProducts.map(p => ({
            SUID: p.seasonsUID,
            "Product Name": p.productVariant.product.name,
            "Inventory Status": p.inventoryStatus,
            "Live Date": moment(p.productVariant.product.publishedAt).format("MM/DD/YYYY"),
            Barcode: `SZNS` + `${p.sequenceNumber}`.padStart(5, "0"),
            "Unit Cost": p.unitCost,
            "Date Ordered": p.dateOrdered,
            "Date Received": p.dateReceived,
            "Product Status": p.productStatus,
            "Sequence Number": p.sequenceNumber,
            Category: p.productVariant.product.category.name,
            Brand: p.productVariant.product.brand.name,
            Architecture: p.productVariant.product.architecture,
            "Product Availability": p.productStatus,
          }))

          jsonExport(data, (err, csv) => {
            downloadCSV(csv, "physicalProducts") // download as 'posts.csv` file
            setIsExporting(false)
          })
        }}
        hasList
        hasShow
        resource="PhysicalProduct"
      >
        <Datagrid
          expand={
            <ExpandedRow
              setUpdatingStatusForPhysicalProduct={setUpdatingStatusForPhysicalProduct}
              setOffloadingPhysicalProduct={setOffloadingPhysicalProduct}
            />
          }
        >
          <TextField source="seasonsUID" label="Seasons UID" />
          <TextField source="inventoryStatus" label="Inventory Status" />
          <TextField source="productStatus" label="Product Status" />
          <TextField source="productVariant.product.name" label="Product Name" />
          <TextField source="productVariant.product.category.name" label="Category" />
          <TextField source="warehouseLocation.barcode" label="Warehouse Location" />
          <ViewEntityField
            source="id"
            entityPath="inventory/product/variant/physicalProduct"
            entityTab={"manage"}
            label="Actions"
          />
        </Datagrid>
      </List>

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
