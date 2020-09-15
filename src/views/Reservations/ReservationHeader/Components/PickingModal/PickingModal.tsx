import React, { useEffect, useRef, useState } from "react"

import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Snackbar,
  Typography,
  Card,
} from "@material-ui/core"
import { DialogTitle, Spacer } from "components"
import { GetReservation } from "generated/GetReservation"
import { PickingProductCard } from "./PickingProductCard"
import { Alert, Color } from "@material-ui/lab"
import { PHYSICAL_PRODUCT_BARCODE_REGEX } from "views/constants"
import { trim } from "lodash"

interface ProductState {
  productUID: string
  picked: boolean
}

interface PickingModalProps {
  open: boolean
  onClose?: () => void
  onSave?(values: ProductStates): void
  disableButton?: boolean
  reservation: GetReservation
}

type ProductStates = { [key: string]: ProductState }

export const PickingModal: React.FC<PickingModalProps> = ({ disableButton, open, onSave, onClose, reservation }) => {
  const barcodeMaps = {}
  const availableProducts = reservation?.products.filter(product => !!product?.warehouseLocation?.id)
  availableProducts.forEach(product => {
    barcodeMaps[product.barcode] = {
      productUID: product.seasonsUID,
      picked: false,
    }
  })

  const [productStates, setProductStates] = useState<ProductStates>({
    ...barcodeMaps,
  })

  const { shippingLabel } = reservation?.sentPackage!

  const [barcode, setBarcode] = useState("")
  const [snackbar, toggleSnackbar] = useState<{ show: boolean; message: string; status: Color }>({
    show: false,
    message: "",
    status: "success",
  })
  const [shouldAllowSave, setShouldAllowSave] = useState(false)

  const alreadyPicked = reservation.status === "Packed"
  const inputRef = useRef()

  const focusOnInput = () => {
    const target: any = inputRef?.current
    target?.focus()
  }

  const handleSave = () => {
    onSave?.(productStates)
  }

  const hideSnackbar = () => {
    toggleSnackbar({
      show: false,
      message: "",
      status: "success",
    })
  }

  const handleBarcodeChange = e => {
    const input = trim(e.target.value)
    if (input.match(PHYSICAL_PRODUCT_BARCODE_REGEX)) {
      const productState = productStates[input]
      if (productState) {
        setBarcode("")
        toggleSnackbar({
          show: true,
          message: `Found barcode: ${input}`,
          status: "success",
        })
        const updatedProductStates = {
          ...productStates,
          [input]: {
            ...productState,
            picked: true,
          },
        }
        setProductStates(updatedProductStates)

        const pickedCount = Object.values(updatedProductStates).filter((a: any) => !!a.picked).length
        setShouldAllowSave(pickedCount === availableProducts.length)
      } else {
        toggleSnackbar({
          show: true,
          message: `Barcode not found`,
          status: "error",
        })
      }
    } else {
      setBarcode(input)
    }
  }

  useEffect(() => {
    const timeout = setTimeout(focusOnInput, 100)

    return () => {
      clearTimeout(timeout)
    }
  }, [open])

  return (
    <>
      <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
          Pick Items
        </DialogTitle>
        <DialogContent dividers>
          {alreadyPicked ? (
            <Box mb={1}>
              <Alert severity="info">Items were already picked. You can proceed to packing.</Alert>
            </Box>
          ) : (
            <Box my={2} width={["400px"]}>
              <TextField
                label="Scan Barcode"
                helperText="Click into box and scan the barcode to mark as picked"
                name="barcode"
                type="text"
                variant="outlined"
                onChange={handleBarcodeChange}
                value={barcode}
                inputRef={inputRef}
                disabled={alreadyPicked}
                fullWidth
              />
            </Box>
          )}
          <Box mt={2} mb={2}>
            <Typography variant="subtitle1">1. Picking items</Typography>
            {availableProducts.map(product => (
              <Box mb={2} key={`product-card-${product.id}`}>
                <PickingProductCard
                  product={product}
                  productState={productStates[product.barcode]}
                  donePicking={alreadyPicked}
                  onStateChange={state => {
                    setProductStates({
                      ...productStates,
                      [product.barcode]: state,
                    })
                  }}
                />
              </Box>
            ))}
          </Box>
          <Box mt={4} mb={2}>
            <Typography variant="subtitle1">2. Print shipping label</Typography>
            <Spacer mt={1} />
            <Card>
              <Box display="flex" alignItems="center" py={2} px={1}>
                <Box flex={1}>
                  <Typography variant="body1">Shipping Label</Typography>
                </Box>
                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      window.open(shippingLabel?.image!, "_blank")
                    }}
                  >
                    Print
                  </Button>
                </Box>
              </Box>
            </Card>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleSave}
            color="primary"
            variant="contained"
            disabled={!shouldAllowSave || disableButton}
          >
            Mark as picked
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.show}
        autoHideDuration={6000}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={hideSnackbar} severity={snackbar.status}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
