import React from "react"
import { useMutation } from "react-apollo"

import { ConfirmationDialog } from "components"
import { ProductEditQuery_product_variants_physicalProducts } from "generated/ProductEditQuery"
import { UPDATE_PHYSICAL_PRODUCT } from "../mutations"
import { useRefresh } from "@seasons/react-admin"
import { useSnackbarContext } from "components/Snackbar"

interface PickPhysicalProductModalProps {
  physicalProduct: ProductEditQuery_product_variants_physicalProducts
  open: boolean
  setOpen: (boolean) => void
}

export const PickPhysicalProductModal: React.FC<PickPhysicalProductModalProps> = ({
  open,
  setOpen,
  physicalProduct,
}) => {
  const refresh = useRefresh()

  const extraSuccessText = physicalProduct.inventoryStatus === "Stored" ? "" : "and marked as NonReservable"
  const { showSnackbar } = useSnackbarContext()
  const [updatePhysicalProduct] = useMutation(UPDATE_PHYSICAL_PRODUCT, {
    onError: error =>
      showSnackbar({
        message: error?.message,
        status: "error",
      }),
    onCompleted: data => {
      showSnackbar({
        message: `Successfully detached warehouse location ${extraSuccessText}.`,
        status: "success",
      })
      refresh()
    },
  })

  if (!physicalProduct) {
    return null
  }

  const onClose = async (agreed: boolean) => {
    let inventoryStatus = physicalProduct.inventoryStatus === "Stored" ? "Stored" : "NonReservable"
    if (agreed) {
      await updatePhysicalProduct({
        variables: {
          where: { id: physicalProduct.id },
          data: {
            warehouseLocation: { disconnect: true },
            inventoryStatus,
          },
        },
      })
    }
  }

  let extraConfirmationText = physicalProduct.inventoryStatus === "Stored" ? "" : " and mark it as non-reservable"
  let confirmationText = `Are you sure you want to pick this physical product? This will remove it's warehouse location${extraConfirmationText}.`
  return (
    <ConfirmationDialog
      title={"Pick Physical Product"}
      body={confirmationText}
      open={open}
      setOpen={setOpen}
      onClose={onClose}
    />
  )
}
