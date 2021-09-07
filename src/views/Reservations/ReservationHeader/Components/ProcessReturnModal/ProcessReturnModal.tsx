import React, { useEffect, useRef, useState } from "react"

import { Button, Dialog, DialogContent, DialogActions, Box, TextField, Card } from "@material-ui/core"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import { DialogTitle } from "components"
import { GetReservation } from "generated/GetReservation"
import { ProcessReturnProductCard } from "./ProcessReturnProductCard"
import { PhysicalProductStatus } from "generated/globalTypes"
import { filter, values, trim } from "lodash"
import { PHYSICAL_PRODUCT_BARCODE_REGEX, RETURN_LABEL_BARCODE_REGEX } from "views/constants"
import { useSnackbarContext } from "components/Snackbar"

interface ProductState {
  productUID: string
  returned: boolean
  productStatus: PhysicalProductStatus
  notes: string
}

interface ProcessReturnModalProps {
  open: boolean
  onClose?: () => void
  onSave?(values: ProductStates, trackingNumber: string): void
  disableButton?: boolean
  reservation: GetReservation
}

type ProductStates = { [key: string]: ProductState }

export const ProcessReturnModal: React.FC<ProcessReturnModalProps> = ({
  disableButton,
  open,
  onSave,
  onClose,
  reservation,
}) => {
  const barcodeMaps = {}
  reservation.products.forEach(product => {
    barcodeMaps[product.barcode] = {
      productUID: product.seasonsUID,
      returned: false,
      damageType: [],
      productStatus: "Dirty",
      notes: "",
    }
  })

  const [productStates, setProductStates] = useState<ProductStates>({
    ...barcodeMaps,
  })

  const [trackingNumber, setTrackingNumber] = useState("")

  const [barcode, setBarcode] = useState("")

  const inputRef = useRef()
  const shouldAllowSave = filter(values(productStates), a => a.returned).length > 0 && !!trackingNumber
  const focusOnInput = () => {
    const target: any = inputRef?.current
    target?.focus()
  }

  const handleSave = () => {
    onSave?.(productStates, trackingNumber)
  }

  const { showSnackbar } = useSnackbarContext()

  const handleBarcodeChange = e => {
    const input = trim(e.target.value)
    if (input.match(PHYSICAL_PRODUCT_BARCODE_REGEX)) {
      const productState = productStates[input]
      if (productState) {
        setBarcode("")
        showSnackbar({
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
        showSnackbar({
          message: `Barcode not found`,
          status: "error",
        })
      }
    } else if (input.match(RETURN_LABEL_BARCODE_REGEX)) {
      setTrackingNumber(input)
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
          Process Returns
        </DialogTitle>
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
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Card style={{ display: "flex", justifyContent: "space-between" }}>
              {!!trackingNumber && <CheckCircleIcon />}
              Tracking Number: {trackingNumber}
            </Card>
          </Box>
          <Box mt={1} mb={2}>
            {reservation.products.map(product => (
              <ProcessReturnProductCard
                key={product.id}
                product={product}
                productState={productStates[product.barcode]}
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
    </>
  )
}
