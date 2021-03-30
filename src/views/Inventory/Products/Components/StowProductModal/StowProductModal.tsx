import React, { useEffect, useRef, useState } from "react"
import { Button, Dialog, DialogContent, DialogActions, Box, TextField, Typography } from "@material-ui/core"
import { DialogTitle } from "components"
import { head, trim, groupBy } from "lodash"
import { PhysicalProduct } from "generated/PhysicalProduct"
import { useQuery, useMutation } from "react-apollo"
import { StowProductInfo } from "./StowProductInfo"
import { WAREHOUSE_LOCATION_BARCODE_REGEX, PHYSICAL_PRODUCT_BARCODE_REGEX } from "views/constants"
import { UPDATE_PHYSICAL_PRODUCT } from "views/Inventory/PhysicalProducts/mutations"
import { PHYSICAL_PRODUCTS_WITH_WAREHOUSE_LOCATIONS_QUERY } from "views/Inventory/PhysicalProducts/queries"
import { useSnackbarContext } from "components/Snackbar"

interface StowProductModalProps {
  open: boolean
  onClose?: () => void
  onSave?(): void
  disableButton?: boolean
}

export const StowProductModal: React.FC<StowProductModalProps> = ({ disableButton, open, onSave, onClose }) => {
  const { data, loading } = useQuery(PHYSICAL_PRODUCTS_WITH_WAREHOUSE_LOCATIONS_QUERY)

  const { showSnackbar } = useSnackbarContext()
  const [updatePhysicalProduct] = useMutation(UPDATE_PHYSICAL_PRODUCT, {
    onCompleted: () => {
      showSnackbar({
        message: `Physical product stowed at ${location}`,
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
  const [barcode, setBarcode] = useState("")
  const [selectedPhysicalProduct, setSelectedPhysicalProduct] = useState<PhysicalProduct | undefined>(undefined)
  const [location, setLocation] = useState(selectedPhysicalProduct?.warehouseLocation?.barcode || "")
  const [physicalProductsByBarcode, setPhysicalProductsByBarcode] = useState({})
  const [validWarehouseLocationBarcodes, setValidWarehouseLocationBarcodes] = useState<string[]>([])

  useEffect(() => {
    if (!loading) {
      setPhysicalProductsByBarcode(groupBy(data?.physicalProducts, a => a.barcode))
      setValidWarehouseLocationBarcodes(data?.warehouseLocations?.map(a => a.barcode))
    }
  }, [loading])

  const inputRef = useRef()

  const focusOnInput = () => {
    const target: any = inputRef?.current
    target?.focus()
  }

  const handleSave = async () => {
    await updatePhysicalProduct({
      variables: {
        where: {
          id: selectedPhysicalProduct?.id,
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
    setSelectedPhysicalProduct(undefined)
    setLocation("")
    onSave?.()
  }

  const handleBarcodeChange = e => {
    const input = trim(e.target.value)
    setBarcode(input)

    if (!selectedPhysicalProduct && input.match(PHYSICAL_PRODUCT_BARCODE_REGEX)) {
      // User has not yet selected a physical product
      setSelectedPhysicalProduct(head(physicalProductsByBarcode[input]))
      setBarcode("")
    } else if (
      !!selectedPhysicalProduct &&
      input.match(WAREHOUSE_LOCATION_BARCODE_REGEX) &&
      validWarehouseLocationBarcodes.includes(input)
    ) {
      // User has already selected a physical product
      setLocation(input)
      setBarcode("")
    }
  }

  useEffect(() => {
    const timeout = setTimeout(focusOnInput, 100)

    return () => {
      clearTimeout(timeout)
    }
  }, [open])

  const fullOnClose = () => {
    setSelectedPhysicalProduct(undefined)
    onClose?.()
  }
  return (
    <>
      <Dialog onClose={fullOnClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={fullOnClose}>
          <Typography variant="subtitle1">Stow Product</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Box my={2}>
            <TextField
              label="Scan Barcode"
              helperText={`Click into box and scan the barcode of the ${
                !!selectedPhysicalProduct ? "warehouse location" : "product"
              }`}
              name="barcode"
              type="text"
              variant="outlined"
              onChange={handleBarcodeChange}
              value={barcode}
              inputRef={inputRef}
              fullWidth
            />
          </Box>
          {!!selectedPhysicalProduct && (
            <>
              <Typography variant="h6" style={{ textAlign: "center" }}>
                OR
              </Typography>
              <Box mt={2} mb={2}>
                <StowProductInfo
                  product={selectedPhysicalProduct}
                  locations={data?.warehouseLocations}
                  barcode={location}
                  onChange={text => {
                    setLocation(text)
                  }}
                />
              </Box>
            </>
          )}
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
    </>
  )
}
