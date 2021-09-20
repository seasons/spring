import React, { useEffect, useRef, useState } from "react"
import { Button, Dialog, DialogContent, DialogActions, Box, TextField, Typography } from "@material-ui/core"
import { DialogTitle } from "components"
import { head, trim, groupBy } from "lodash"
import { useQuery, useMutation } from "react-apollo"
import { StowMultiProductsInfo } from "./StowMultiProductsInfo"
import { WAREHOUSE_LOCATION_BARCODE_REGEX, PHYSICAL_PRODUCT_BARCODE_REGEX } from "views/constants"
import { STOW_ITEMS } from "views/Inventory/PhysicalProducts/mutations"
import { PHYSICAL_PRODUCTS_WITH_WAREHOUSE_LOCATIONS_QUERY } from "views/Inventory/PhysicalProducts/queries"
import { useSnackbarContext } from "components/Snackbar"
import { WarehouseLocationsDropdown } from "./WarehouseLocations"

interface StowMultiProductModalProps {
  open: boolean
  onClose?: () => void
  onSave?(): void
  disableButton?: boolean
}

export const StowMultiProductsModal: React.FC<StowMultiProductModalProps> = ({
  disableButton,
  open,
  onSave,
  onClose,
}) => {
  const { data, loading } = useQuery(PHYSICAL_PRODUCTS_WITH_WAREHOUSE_LOCATIONS_QUERY)

  const { showSnackbar } = useSnackbarContext()
  const [stowItems] = useMutation(STOW_ITEMS, {
    onCompleted: () => {
      showSnackbar({
        message: `Physical products stowed at ${location}`,
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
  const [location, setLocation] = useState("")
  const [physicalProductsByBarcode, setPhysicalProductsByBarcode] = useState({})
  const [validWarehouseLocationBarcodes, setValidWarehouseLocationBarcodes] = useState<string[]>([])
  const [selectedPhysicalProducts, setSelectedPhysicalProducts] = useState<any>([])
  const [selectedPhysicalProductsIDs, setSelectedPhysicalProductsIDs] = useState<string[]>([])
  const [removePhysicalProduct, setRemovePhysicalProduct] = useState("")

  useEffect(() => {
    if (!loading) {
      setPhysicalProductsByBarcode(groupBy(data?.physicalProducts, a => a.barcode))
      setValidWarehouseLocationBarcodes(data?.warehouseLocations?.map(a => a.barcode))
    }
  }, [data, loading])

  const inputRef = useRef()

  const focusOnInput = () => {
    const target: any = inputRef?.current
    target?.focus()
  }

  const handleSave = async () => {
    await stowItems({
      variables: {
        ids: selectedPhysicalProductsIDs,
        warehouseLocationBarcode: location,
      },
    })
    setSelectedPhysicalProducts([])
    setSelectedPhysicalProductsIDs([])
    setLocation("")
    setBarcode("")
    onSave?.()
    focusOnInput()
  }

  const handleBarcodeChange = e => {
    const input = trim(e.target.value)
    setBarcode(input)

    if (selectedPhysicalProducts.length === 30) {
      showSnackbar({
        message: `Cannot stow more than 30 items at a given warehouse location`,
        status: "error",
      })
      return
    }

    if (input.match(PHYSICAL_PRODUCT_BARCODE_REGEX)) {
      // User has not yet selected a physical product
      const selectedPhysicalProduct = head<any>(physicalProductsByBarcode[input])
      if (!selectedPhysicalProduct) return
      setSelectedPhysicalProducts([selectedPhysicalProduct, ...selectedPhysicalProducts])
      setSelectedPhysicalProductsIDs([...selectedPhysicalProductsIDs, selectedPhysicalProduct?.id])
      setBarcode("")
    } else if (
      !!selectedPhysicalProducts &&
      input.match(WAREHOUSE_LOCATION_BARCODE_REGEX) &&
      validWarehouseLocationBarcodes.includes(input)
    ) {
      // User has already selected a physical product
      setLocation(input)
      setBarcode("")
    }
  }

  useEffect(() => {
    const filteredPhysicalProducts = selectedPhysicalProducts.filter(a => a.id !== removePhysicalProduct)
    setSelectedPhysicalProductsIDs(filteredPhysicalProducts)
    setSelectedPhysicalProducts(filteredPhysicalProducts)
  }, [removePhysicalProduct])

  useEffect(() => {
    const timeout = setTimeout(focusOnInput, 100)

    return () => {
      clearTimeout(timeout)
    }
  }, [open])

  const fullOnClose = () => {
    setSelectedPhysicalProductsIDs([])
    setSelectedPhysicalProducts([])
    setLocation("")
    setBarcode("")
    onClose?.()
  }

  return (
    <>
      <Dialog onClose={fullOnClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={fullOnClose}>
          <Typography variant="subtitle1">Stow Multiple Products</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Box my={2}>
            <TextField
              label="Scan Barcode"
              helperText={`Click into box and scan the barcode of the ${
                !selectedPhysicalProducts ? "warehouse location" : "product"
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

          <WarehouseLocationsDropdown
            locations={data?.warehouseLocations}
            location={location}
            onChange={text => {
              setLocation(text)
            }}
          />

          {!!selectedPhysicalProducts &&
            selectedPhysicalProducts.map(product => {
              return (
                <>
                  <Box mt={2} mb={2}>
                    <StowMultiProductsInfo
                      product={product}
                      locations={data?.warehouseLocations}
                      barcode={location}
                      onRemove={text => {
                        setRemovePhysicalProduct(text)
                      }}
                    />
                  </Box>
                </>
              )
            })}
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
