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
import { DialogTitle, Spacer } from "components"
import { PhysicalProductStatus } from "generated/globalTypes"
import { filter, values, trim } from "lodash"
import { useLazyQuery, useQuery } from "react-apollo"
import { PHYSICAL_PRODUCT_BARCODE_REGEX, RETURN_LABEL_BARCODE_REGEX } from "views/constants"
import { useSnackbarContext } from "components/Snackbar"
import styled from "styled-components"
import { useLocation } from "react-router-dom"
import { TrackingNumberCheckCircle } from "views/Reservations/TrackingNumberCheckCircle"
import { ContactSupportOutlined } from "@material-ui/icons"
import { PhysicalProductFragment } from "queries/PhysicalProduct"
import gql from "graphql-tag"
import { ProcessReturnProductCard } from "../ProcessReturnModal/ProcessReturnProductCard"
import { AnyRecord } from "dns"

interface ProductState {
  productUID: string
  returned: boolean
  productStatus: PhysicalProductStatus
  notes: string
}

interface MultiItemReturnProps {
  open: boolean
  onClose?: () => void
  onSave?(values: ProductStates, trackingNumber: TrackingNumber): void
  disableButton?: boolean
}
interface TrackingNumber {
  trackingNumber: string
}

type ProductStates = { [key: string]: ProductState }

const GET_PHYSICAL_PRODUCT_FOR_MULTI_ITEM_RETURN = gql`
  query GetPhysicalProductForMultiItemReturn($sequenceNumber: Int) {
    physicalProducts(where: { sequenceNumber: $sequenceNumber }, first: 1) {
      ...PhysicalProduct
    }
  }
  ${PhysicalProductFragment}
`
export const MultiItemReturnModal: React.FC<MultiItemReturnProps> = ({ disableButton, open, onSave, onClose }) => {
  const location = useLocation()
  const scannedTrackingNumber: any = location?.state ? location?.state : {}
  useEffect(() => {
    if (scannedTrackingNumber?.trackingNumber) {
      setTrackingNumber(scannedTrackingNumber?.trackingNumber)
    }
  }, [location])

  const [productStates, setProductStates] = useState<ProductStates>({})
  const barcodeMaps = {}
  const [physicalProducts, setPhysicalProducts] = useState<any>([])

  const [trackingNumber, setTrackingNumber] = useState("")

  const [barcode, setBarcode] = useState("")
  const [sequenceNumber, setSequenceNumber] = useState<any>()

  const inputRef = useRef()
  //   const shouldAllowSave = filter(values(productStates), a => a.returned).length > 0 && !!trackingNumber
  const focusOnInput = () => {
    const target: any = inputRef?.current
    target?.focus()
  }

  const [newPhysicalProduct, { loading, data }] = useLazyQuery(GET_PHYSICAL_PRODUCT_FOR_MULTI_ITEM_RETURN, {
    variables: { sequenceNumber: sequenceNumber },
  })

  //   const handleSave = () => {
  //     onSave?.(productStates, { trackingNumber: trackingNumber })
  //   }

  const { showSnackbar } = useSnackbarContext()

  useEffect(() => {
    if (sequenceNumber) {
      newPhysicalProduct({
        variables: {
          sequenceNumber: sequenceNumber,
        },
      })
    }
  }, [sequenceNumber])
  const Dirty = "Dirty"
  useEffect(() => {
    if (data?.physicalProducts) {
      const physicalProduct = data.physicalProducts[0]
      barcodeMaps[physicalProduct.barcode] = {
        productUID: physicalProduct.seasonsUID,
        returned: false,
        damageType: [],
        productStatus: "Dirty",
        notes: "",
      }
      setProductStates({ ...barcodeMaps, ...productStates })
      setPhysicalProducts([physicalProduct, ...physicalProducts])
    }
  }, [data])

  const handleBarcodeChange = e => {
    const input = trim(e.target.value)
    if (input.match(PHYSICAL_PRODUCT_BARCODE_REGEX)) {
      // const productState = productStates[input]

      const getSequenceNumber = input => {
        for (let i = 4; i <= input.length; i++) {
          if (input[i] > 0) {
            return parseInt(input.slice(i))
          }
        }
      }
      setSequenceNumber(getSequenceNumber(input))
      setBarcode("")
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
          Multi Item Return
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
            <TrackingNumberCheckCircle trackingNumber={trackingNumber} />
          </Box>
        </DialogContent>
        <Box mt={1} mb={2}>
          {physicalProducts.map(product => {
            console.log(product)
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
        <DialogActions>
          <Button
            autoFocus
            // onClick={}
            color="primary"
            variant="contained"
            disabled={!disableButton}
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
