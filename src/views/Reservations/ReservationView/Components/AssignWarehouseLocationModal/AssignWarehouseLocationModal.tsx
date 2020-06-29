import React, { useEffect, useRef, useState } from "react"

import { Button, Dialog, DialogContent, DialogActions, Box, TextField, Snackbar, Typography } from "@material-ui/core"
import { DialogTitle } from "components"
import { Alert, Color } from "@material-ui/lab"
import { trim } from "lodash"
import { PhysicalProduct } from "generated/PhysicalProduct"
import { useQuery, useMutation } from "react-apollo"
import { GET_WAREHOUSE_LOCATIONS } from "views/Reservations/queries"
import { AssignWarehouseLocationInfo } from "./AssignWarehouseLocationInfo"
import { UPDATE_PHYSICAL_PRODUCT } from "views/Inventory/Products/mutations"
import { WAREHOUSE_LOCATION_BARCODE_REGEX } from "views/constants"

interface AssignWarehouseLocationModalProps {
  open: boolean
  onClose?: () => void
  onSave?(): void
  disableButton?: boolean
  physicalProduct: PhysicalProduct
}

export const AssignWarehouseLocationModal: React.FC<AssignWarehouseLocationModalProps> = ({
  disableButton,
  open,
  onSave,
  onClose,
  physicalProduct,
}) => {
  const { data, loading } = useQuery(GET_WAREHOUSE_LOCATIONS)
  const [updatePhysicalProduct] = useMutation(UPDATE_PHYSICAL_PRODUCT, {
    onCompleted: () => {
      toggleSnackbar({
        show: true,
        message: "Physical product updated",
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
  const [barcode, setBarcode] = useState("")
  const [location, setLocation] = useState(physicalProduct?.warehouseLocation?.barcode || "")
  const [snackbar, toggleSnackbar] = useState<{ show: boolean; message: string; status: Color }>({
    show: false,
    message: "",
    status: "success",
  })

  const inputRef = useRef()

  const focusOnInput = () => {
    const target: any = inputRef?.current
    target?.focus()
  }

  const handleSave = async () => {
    await updatePhysicalProduct({
      variables: {
        where: {
          id: physicalProduct.id,
        },
        data: {
          warehouseLocation: {
            connect: {
              barcode: location,
            },
          },
        },
      },
    })
    onSave?.()
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
    if (input.match(WAREHOUSE_LOCATION_BARCODE_REGEX)) {
      console.log("Found barcode: ", input)
      setLocation(input)
      setBarcode(input)
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
          <Box my={2}>
            <TextField
              label="Scan Barcode"
              helperText="Click into box and scan the barcode of the location"
              name="barcode"
              type="text"
              variant="outlined"
              onChange={handleBarcodeChange}
              value={barcode}
              inputRef={inputRef}
              fullWidth
            />
          </Box>
          <Typography variant="h6" style={{ textAlign: "center" }}>
            OR
          </Typography>

          <Box mt={2} mb={2}>
            <AssignWarehouseLocationInfo
              product={physicalProduct}
              locations={data?.warehouseLocations}
              barcode={location}
              onChange={text => {
                setLocation(text)
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleSave}
            color="primary"
            variant="contained"
            disabled={!location || disableButton}
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
