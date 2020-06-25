import React, { useEffect, useRef, useState } from "react"

import { Button, Dialog, DialogContent, DialogActions, Box, TextField, Snackbar, Typography } from "@material-ui/core"
import { DialogTitle } from "components"
import { Alert, Color } from "@material-ui/lab"
import { trim } from "lodash"
import { PhysicalProduct } from "generated/PhysicalProduct"
import { useQuery } from "react-apollo"
import { GET_WAREHOUSE_LOCATIONS } from "views/Reservations/queries"
import { AssignWarehouseLocationInfo } from "./AssignWarehouseLocationInfo"

interface ProductState {
  productUID: string
  picked: boolean
}

interface AssignWarehouseLocationModalProps {
  open: boolean
  onClose?: () => void
  onSave?(values: ProductStates): void
  disableButton?: boolean
  physicalProduct: PhysicalProduct
}

type ProductStates = { [key: string]: ProductState }

export const AssignWarehouseLocationModal: React.FC<AssignWarehouseLocationModalProps> = ({
  disableButton,
  open,
  onSave,
  onClose,
  physicalProduct,
}) => {
  const { data, loading } = useQuery(GET_WAREHOUSE_LOCATIONS)
  const [barcode, setBarcode] = useState("")
  const [snackbar, toggleSnackbar] = useState<{ show: boolean; message: string; status: Color }>({
    show: false,
    message: "",
    status: "success",
  })
  const [shouldAllowSave, setShouldAllowSave] = useState(false)
  const BARCODE_REGEX = /^SZNS[0-9]{5}$/

  const inputRef = useRef()

  const focusOnInput = () => {
    const target: any = inputRef?.current
    target?.focus()
  }

  const handleSave = () => {
    console.log("Save: ")
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

      const productState = true
      if (productState) {
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
          <Typography variant="subtitle1">Assign Warehouse Location</Typography>
        </DialogTitle>
        <DialogContent dividers>
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
              fullWidth
            />
          </Box>

          <Box mt={2} mb={2}>
            <AssignWarehouseLocationInfo product={physicalProduct} locations={data?.warehouseLocations} />
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
            Save
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
