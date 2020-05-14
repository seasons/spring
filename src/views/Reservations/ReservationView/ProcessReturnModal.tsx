import React, { useEffect, useRef, useState } from "react"

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  TextField,
  Snackbar,
} from "@material-ui/core"
import { GetReservation } from "generated/GetReservation"
import { ProcessReturnProductCard } from "./ProcessReturnProductCard"
import { Alert, Color } from "@material-ui/lab"

interface ProcessReturnModalProps {
  open: boolean
  onClose?: () => void
  onSave?(values: {}): void
  reservation: GetReservation
}

export const ProcessReturnModal: React.FC<ProcessReturnModalProps> = ({ open, onSave, onClose, reservation }) => {
  // TODO add status updates and notes for reservation return
  // Add Scanner to this view to process reservation
  // Move checkbox ("Mark as returned") an a more options menu

  // 1. After that set all products to the in cleaning
  // (Guided Stow) Part of the return flow is tell where each item should go back to

  // Picking flow, New to Pick
  // Start Picking
  // allow them to scan the barcode to set the status of an item as picked
  // 1. scan all items
  // 2. print label
  // 3. set to ready to ship
  // 3. set reservation to shipped by scanning label

  const barcodeMaps = {}
  ;(reservation.products as any).map(product => {
    barcodeMaps[product.barcode] = {
      returned: false,
      productStatus: "Dirty",
      notes: "",
    }
  })

  const [productStates, setProductStates] = useState({
    ...barcodeMaps,
  })
  console.log(productStates)
  const [barcode, setBarcode] = useState("")
  const [snackbar, toggleSnackbar] = useState<{ show: boolean; message: string; status: Color }>({
    show: false,
    message: "",
    status: "success",
  })
  const BARCODE_REGEX = /^SZNS[0-9]{5}$/

  const inputRef = useRef()

  const focusOnInput = () => {
    const target: any = inputRef?.current
    target?.focus()
  }

  const handleSave = () => {
    console.log("Save: ", productStates)
  }

  const hideSnackbar = () => {
    toggleSnackbar({
      show: false,
      message: "",
      status: "success",
    })
  }

  const handleBarcodeChange = e => {
    const input = e.target.value
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
        setProductStates({
          ...productStates,
          [input]: {
            ...productState,
            returned: true,
          },
        })
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
        <DialogTitle id="customized-dialog-title">Process Returns</DialogTitle>
        <DialogContent dividers>
          <Box my={2} width={["550px"]}>
            <TextField
              label="Scan Barcode"
              helperText="Click into box and scan the barcode to mark as returned"
              name="barcode"
              type="text"
              variant="outlined"
              onChange={handleBarcodeChange}
              value={barcode}
              inputRef={inputRef}
              fullWidth
            />
          </Box>
          <Box mt={1} mb={2}>
            {reservation.products.map(product => (
              <ProcessReturnProductCard
                product={product}
                productState={productStates[product.barcode]}
                key={product.id}
                onStateChange={state => {
                  setProductStates({
                    ...productStates,
                    [product.barcode]: state,
                  })
                }}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave} color="primary">
            Save changes
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
