import React, { useState } from "react"
import { Header } from "components"
import { HeaderRenderProps } from "components/DetailView"
import { useRefresh } from "@seasons/react-admin"
import { OffloadPhysicalProductModal, PickPhysicalProductModal } from "../Components"
import { PrintBarcodeModal } from "../Components/PrintBarcodeModal"
import { UndoOffloadModal } from "../Components/UndoOffloadModal"

export const PhysicalProductDetailViewHeader = ({ data: physicalProduct }: HeaderRenderProps) => {
  const { productVariant, seasonsUID } = physicalProduct
  const { warehouseLocation } = physicalProduct
  const refresh = useRefresh()

  // Modal handlers
  const [openOffloadModal, setOpenOffloadModal] = useState(false)
  const [openUndoOffloadModal, setUndoOffloadModal] = useState(false)
  const [openPickModal, setOpenPickModal] = useState(false)
  const [openPrintBarcodeModal, setOpenPrintBarcodeModal] = useState(false)
  const onCloseOffloadModal = () => {
    setOpenOffloadModal(false)
    refresh()
  }

  // Create breadcrumbs
  const breadcrumbs = [
    {
      title: "Physical products",
      url: "/inventory/physicalproducts",
    },
  ]
  if (productVariant) {
    const { product } = productVariant
    breadcrumbs.push({
      title: product.name,
      url: `/inventory/products/${product.id}`,
    })
    breadcrumbs.push({
      title: productVariant.sku || "",
      url: `/inventory/product/variants/${productVariant.id}`,
    })
    breadcrumbs.push({
      title: seasonsUID,
      url: `/inventory/product/variants/physicalProducts/${physicalProduct.id}`,
    })
  }

  // Create menu items
  const menuItems = [
    {
      text: "Print barcode",
      action: async () => setOpenPrintBarcodeModal(true),
    },
  ] as any
  if (physicalProduct.inventoryStatus !== "Offloaded") {
    menuItems.push({
      text: "Offload",
      action: async () => setOpenOffloadModal(true),
    })
  }
  if (!!warehouseLocation) {
    menuItems.push({
      text: "Pick",
      action: async () => setOpenPickModal(true),
    })
  }
  if (physicalProduct.inventoryStatus === "Offloaded") {
    menuItems.push({
      text: "Undo offload",
      action: async () => setUndoOffloadModal(true),
    })
  }

  return (
    <>
      <Header
        title={seasonsUID}
        subtitle="Edit physical product data"
        breadcrumbs={breadcrumbs}
        menuItems={menuItems}
      />
      {openOffloadModal && (
        <OffloadPhysicalProductModal
          open={openOffloadModal}
          onClose={onCloseOffloadModal}
          physicalProduct={physicalProduct as any}
        />
      )}
      {openPickModal && (
        <PickPhysicalProductModal
          open={openPickModal}
          setOpen={setOpenPickModal}
          physicalProduct={physicalProduct as any}
        />
      )}
      {openPrintBarcodeModal && (
        <PrintBarcodeModal
          physicalProduct={physicalProduct}
          open={openPrintBarcodeModal}
          setOpen={setOpenPrintBarcodeModal}
        />
      )}
      {openUndoOffloadModal && (
        <UndoOffloadModal physicalProduct={physicalProduct} open={openUndoOffloadModal} setOpen={setUndoOffloadModal} />
      )}
    </>
  )
}
