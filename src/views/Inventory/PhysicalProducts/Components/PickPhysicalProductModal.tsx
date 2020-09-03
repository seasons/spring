import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { Button, Dialog, DialogContent, DialogActions, DialogContentText } from "@material-ui/core"
import { DialogTitle, Loader } from "components"
import { SnackbarState } from "components/Snackbar"
import { ProductEditQuery_product_variants_physicalProducts } from "generated/ProductEditQuery"
import { UPDATE_PHYSICAL_PRODUCT } from "../mutations"
import { colors } from "theme"

interface PickPhysicalProductModalProps {
  open: boolean
  physicalProduct: ProductEditQuery_product_variants_physicalProducts
  onClose: () => void
  toggleSnackbar?: (state: SnackbarState) => void
}

export const PickPhysicalProductModal: React.FC<PickPhysicalProductModalProps> = ({
  open,
  onClose,
  toggleSnackbar,
  physicalProduct,
}) => {
  const [isMutating, setIsMutating] = useState(false)
  const [updatePhysicalProduct] = useMutation(UPDATE_PHYSICAL_PRODUCT, {
    onError: error => {
      toggleSnackbar?.({
        show: true,
        message: error?.message,
        status: "error",
      })
    },
  })

  if (!physicalProduct) {
    return null
  }

  const onSubmit = async () => {
    setIsMutating(true)
    await updatePhysicalProduct({
      variables: {
        where: { id: physicalProduct.id },
        data: {
          warehouseLocation: { disconnect: true },
          inventoryStatus: "NonReservable",
        },
      },
    })
    setIsMutating(false)
    onClose()
  }

  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
        Pick physical product
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to pick this physical product? This will remove it's warehouse location and mark it as
          non-reservable.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary" autoFocus>
          {isMutating ? <Loader color={colors.black100} size={20} /> : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
