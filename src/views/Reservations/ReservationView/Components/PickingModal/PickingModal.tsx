import React, { useEffect, useRef, useState } from "react"

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Snackbar,
  Typography,
} from "@material-ui/core"
import { GetReservation } from "generated/GetReservation"
import { PickingProductCard } from "./PickingProductCard"
import { Alert, Color } from "@material-ui/lab"
import { trim } from "lodash"

interface ProductState {
  productUID: string
  picked: boolean
}

interface PickingModalProps {
  open: boolean
  onClose?: () => void
  onSave?(values: ProductStates): void
  reservation: GetReservation
}

type ProductStates = { [key: string]: ProductState }

export const PickingModal: React.FC<PickingModalProps> = ({ open, onSave, onClose, reservation }) => {
  const barcodeMaps = {}
  reservation.products.forEach(product => {
    barcodeMaps[product.barcode] = {
      productUID: product.seasonsUID,
      picked: false,
    }
  })

  const [productStates, setProductStates] = useState<ProductStates>({
    ...barcodeMaps,
  })
  console.log(productStates)

  const [barcode, setBarcode] = useState("")
  const [snackbar, toggleSnackbar] = useState<{ show: boolean; message: string; status: Color }>({
    show: false,
    message: "",
    status: "success",
  })
  const [shouldAllowSave, setShouldAllowSave] = useState(false)
  const BARCODE_REGEX = /^SZNS[0-9]{5}$/

  const alreadyPicked = reservation.status === "Packed"
  const inputRef = useRef()

  const focusOnInput = () => {
    const target: any = inputRef?.current
    target?.focus()
  }

  const handleSave = () => {
    console.log("Save: ", productStates)
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
    if (input.match(BARCODE_REGEX)) {
      console.log("Found barcode: ", input)

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
        setShouldAllowSave(pickedCount === reservation.products.length)
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
        <DialogTitle id="customized-dialog-title">Pick Items</DialogTitle>
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
            {reservation.products.map(product => (
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
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave} color="primary" variant="contained" disabled={!shouldAllowSave}>
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
