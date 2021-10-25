import React, { useEffect, useRef, useState } from "react"

import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Card,
  colors,
  Typography,
} from "@material-ui/core"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import { DialogTitle, Spacer } from "components"
import { ProcessReturnProductCard } from "./ProcessReturnProductCard"
import { PhysicalProductStatus } from "generated/globalTypes"
import { filter, values, trim } from "lodash"
import { PHYSICAL_PRODUCT_BARCODE_REGEX, RETURN_LABEL_BARCODE_REGEX } from "views/constants"
import { useSnackbarContext } from "components/Snackbar"
import styled from "styled-components"
import { useLocation } from "react-router-dom"

interface ProductState {
  productUID: string
  returned: boolean
  productStatus: PhysicalProductStatus
  notes: string
}

interface ProcessReturnModalProps {
  open: boolean
  onClose?: () => void
  onSave?(values: ProductStates, trackingNumber: TrackingNumber): void
  disableButton?: boolean
  bagItems: any
}
interface TrackingNumber {
  trackingNumber: string
}

type ProductStates = { [key: string]: ProductState }

export const ProcessReturnModal: React.FC<ProcessReturnModalProps> = ({
  disableButton,
  open,
  onSave,
  onClose,
  bagItems,
}) => {
  const barcodeMaps = {}
  bagItems.forEach(bagItem => {
    barcodeMaps[bagItem.product.barcode] = {
      productUID: bagItem.product.seasonsUID,
      returned: false,
      damageType: [],
      productStatus: "Dirty",
      notes: "",
    }
  })

  const location = useLocation()
  const scannedTrackingNumber: any = location?.state ? location?.state : {}
  useEffect(() => {
    if (scannedTrackingNumber?.trackingNumber) {
      setTrackingNumber(scannedTrackingNumber?.trackingNumber)
    }
  }, [location])

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
    onSave?.(productStates, { trackingNumber: trackingNumber })
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
      setBarcode("")
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
          <Box my={1}>
            <Card elevation={1}>
              {trackingNumber ? (
                <TrackingNumber width="100%" py={3}>
                  <CheckCircleIcon htmlColor={colors.green[500]} />
                  <Spacer m={1} />
                  <Typography variant="h5">Tracking Number: {trackingNumber}</Typography>
                </TrackingNumber>
              ) : (
                <TrackingNumber width="100%" py={3}>
                  <CheckCircleIcon />
                  <Spacer m={1} />
                  <Typography variant="h5"> Please scan the label from the return package</Typography>
                </TrackingNumber>
              )}
            </Card>
          </Box>
          <Box mt={1} mb={2}>
            {bagItems.map(bagItem => {
              const product = bagItem.product
              return (
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
              )
            })}
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

const TrackingNumber = styled(Box)`
  display: flex;
  justify-content: center;
`
