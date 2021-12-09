import React, { useEffect, useRef, useState } from "react"
import { Button, Dialog, DialogContent, DialogActions, Box, TextField, Typography, colors } from "@material-ui/core"
import { DialogTitle } from "components"
import { trim } from "lodash"
import { useQuery, useMutation, useLazyQuery } from "react-apollo"
import { StowMultiProductsInfo } from "./StowMultiProductsInfo"
import { WAREHOUSE_LOCATION_BARCODE_REGEX, PHYSICAL_PRODUCT_BARCODE_REGEX } from "views/constants"
import { STOW_ITEMS } from "views/Inventory/PhysicalProducts/mutations"
import { PHYSICAL_PRODUCT_FOR_STOW, WAREHOUSE_LOCATIONS_QUERY } from "views/Inventory/PhysicalProducts/queries"
import { useSnackbarContext } from "components/Snackbar"
import { WarehouseLocationsDropdown } from "./WarehouseLocations"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import { useRefresh } from "@seasons/react-admin"
import { barcodeToSequenceNumber } from "views/Inventory/PhysicalProducts/utils"

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
  const { data, loading } = useQuery(WAREHOUSE_LOCATIONS_QUERY)
  const [getSelectedPhysicalProduct, { data: selectedPhysProdData, loading: loadingPhysProdForStow }] = useLazyQuery(
    PHYSICAL_PRODUCT_FOR_STOW
  )

  const refresh = useRefresh()
  const { showSnackbar } = useSnackbarContext()
  const [stowItems] = useMutation(STOW_ITEMS, {
    onCompleted: () => {
      showSnackbar({
        message: `Physical products stowed at ${location}`,
        status: "success",
      })
      setSelectedPhysicalProducts([])
      setSelectedPhysicalProductsIDs([])
      setLocation("")
      setBarcode("")
      onSave?.()
      refresh()
      inputRef?.current?.focus()
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
  const [validWarehouseLocationBarcodes, setValidWarehouseLocationBarcodes] = useState<string[]>([])
  const [selectedPhysicalProduct, setSelectedPhysicalProduct] = useState<any>(undefined)
  const [selectedPhysicalProducts, setSelectedPhysicalProducts] = useState<any>([])
  const [selectedPhysicalProductsIDs, setSelectedPhysicalProductsIDs] = useState<string[]>([])
  const [removePhysicalProduct, setRemovePhysicalProduct] = useState<any>()

  useEffect(() => {
    if (!loading) {
      setValidWarehouseLocationBarcodes(data?.warehouseLocations?.map(a => a.barcode))
    }
  }, [data, loading])

  useEffect(() => {
    if (!!selectedPhysProdData?.physicalProduct) {
      const selectedPhysicalProduct = selectedPhysProdData?.physicalProduct
      setSelectedPhysicalProducts([selectedPhysicalProduct, ...selectedPhysicalProducts])
      setSelectedPhysicalProductsIDs([...selectedPhysicalProductsIDs, selectedPhysicalProduct?.id])
      setSelectedPhysicalProduct(selectedPhysProdData?.physicalProduct)
    }
  }, [selectedPhysProdData, loadingPhysProdForStow])

  const inputRef = useRef<any>()

  const handleSave = async () => {
    await stowItems({
      variables: {
        ids: selectedPhysicalProductsIDs,
        warehouseLocationBarcode: location,
      },
    })
  }

  const handleBarcodeChange = e => {
    const input = trim(e.target.value)
    setBarcode(input)

    if (selectedPhysicalProducts.length >= 30) {
      showSnackbar({
        message: `Cannot stow more than 30 items at a given warehouse location`,
        status: "error",
      })
      return
    }

    if (input.match(PHYSICAL_PRODUCT_BARCODE_REGEX)) {
      const sn = barcodeToSequenceNumber(input)
      getSelectedPhysicalProduct({ variables: { sequenceNumber: sn } })
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
    const remainingPhysProds = selectedPhysicalProducts
      .slice(0, removePhysicalProduct)
      .concat(selectedPhysicalProducts.slice(removePhysicalProduct + 1))

    const remainingPhysProdsIds = remainingPhysProds.map(a => a.id)
    setSelectedPhysicalProductsIDs(remainingPhysProdsIds)
    setSelectedPhysicalProducts(remainingPhysProds)
  }, [removePhysicalProduct])

  useEffect(() => {
    const timeout = setTimeout(inputRef?.current?.focus(), 100)

    return () => {
      clearTimeout(timeout)
    }
  }, [open, inputRef])

  const fullOnClose = () => {
    setSelectedPhysicalProductsIDs([])
    setSelectedPhysicalProducts([])
    setLocation("")
    setBarcode("")
    onClose?.()
  }

  return (
    <Dialog onClose={fullOnClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={fullOnClose}>
        <Typography variant="subtitle1">Stow Multiple Products</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Box my={2}>
          <TextField
            label="Scan barcode"
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

        {location ? (
          <Box display="flex" justifyContent="space-between" width={300} pt={1}>
            <CheckCircleIcon htmlColor={colors.green[500]} />
            <Box pt={0.5}>
              <Typography variant="h5">Location: {location}</Typography>
            </Box>
          </Box>
        ) : (
          <Box display="flex" justifyContent="space-between" width={300} pt={1}>
            <CheckCircleIcon />
            <Box pt={0.5}>
              <Typography variant="h5"> Please scan warehouse location</Typography>
            </Box>
          </Box>
        )}

        {!!selectedPhysicalProducts &&
          selectedPhysicalProducts.map((product, index) => {
            return (
              <>
                <Box mt={2} mb={2}>
                  <StowMultiProductsInfo
                    product={product}
                    locations={data?.warehouseLocations}
                    barcode={location}
                    onRemove={() => setRemovePhysicalProduct(index)}
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
  )
}
