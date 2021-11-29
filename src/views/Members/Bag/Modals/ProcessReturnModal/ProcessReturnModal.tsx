import React, { useEffect, useRef, useState } from "react"

import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  Card,
  InputLabel,
  FormControl,
} from "@material-ui/core"
import { DialogTitle } from "components"
import { PhysicalProductStatus } from "generated/globalTypes"
import { omit, trim } from "lodash"
import { useLazyQuery } from "react-apollo"
import { PHYSICAL_PRODUCT_BARCODE_REGEX, RETURN_LABEL_BARCODE_REGEX } from "views/constants"
import { useSnackbarContext } from "components/Snackbar"
import styled from "styled-components"
import { useLocation } from "react-router-dom"
import { TrackingNumberCheckCircle } from "views/Reservations/TrackingNumberCheckCircle"
import { PhysicalProductFragment } from "queries/PhysicalProduct"
import gql from "graphql-tag"
import { ProcessReturnProductCard } from "./ProcessReturnProductCard"

import { useRefresh } from "@seasons/react-admin"
import { useMutation } from "react-apollo"
import { SUBMIT_QA_ENTRY } from "components/ProductQAModal"
import { useSelector } from "react-redux"

const PROCESS_RETURN = gql`
  mutation ProcessReturn(
    $trackingNumber: String
    $productStates: [ProductStateInput!]!
    $droppedOffBy: ReservationDropOffAgent!
    $customerId: String
  ) {
    processReturn(
      trackingNumber: $trackingNumber
      productStates: $productStates
      droppedOffBy: $droppedOffBy
      customerId: $customerId
    )
  }
`

interface ProductState {
  productUID: string
  returned: boolean
  productStatus: PhysicalProductStatus
  notes: string
}

interface MultiItemReturnProps {
  open: boolean
  onClose?: () => void
  customerId: string
  bagSections: any
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
export const ProcessReturnModal: React.FC<MultiItemReturnProps> = ({ open, onClose, customerId, bagSections }) => {
  const session: any = useSelector<{ session: any }>(state => state.session)
  const location = useLocation()
  const scannedTrackingNumber: any = location?.state ? location?.state : {}
  useEffect(() => {
    if (scannedTrackingNumber?.trackingNumber) {
      setTrackingNumber(scannedTrackingNumber?.trackingNumber)
    }
  }, [location, scannedTrackingNumber])

  const refresh = useRefresh()
  let barcodeMaps = {}
  const [productStates, setProductStates] = useState<ProductStates>({})
  const [physicalProducts, setPhysicalProducts] = useState<any>([])
  const [trackingNumber, setTrackingNumber] = useState("")
  const [barcode, setBarcode] = useState("")
  const [sequenceNumber, setSequenceNumber] = useState<any>()
  const [droppedOffBy, setDroppedOffBy] = useState<any>("UPS")
  const returnable = bagSections
    .filter(a => {
      const bagItems = a.bagItems
      if (
        (a.id === "returnPending" ||
          a.id === "inbound" ||
          a.id === "deliveredToBusiness" ||
          a.id === "deliveredToCustomer") &&
        bagItems
      ) {
        return bagItems
      }
    })
    .flat()
    .map(a => a.bagItems)
    .flat()
    .map(a => a.physicalProduct.barcode)

  const nonReturnable = bagSections
    .filter(a => {
      const bagItems = a.bagItems

      if (
        !(
          a.id === "returnPending" ||
          a.id === "inbound" ||
          a.id === "deliveredToBusiness" ||
          a.id === "deliveredToCustomer"
        ) &&
        bagItems
      ) {
        return bagItems
      }
    })
    .map(a => a.bagItems)
    .flat()
    .map(a => a.physicalProduct.barcode)

  const inBagCheck = barcode => {
    if (nonReturnable.includes(barcode)) {
      showSnackbar({
        message: "This item is not ready for return",
        status: "error",
      })
      return false
    }
    if (!nonReturnable.includes(barcode) && !returnable.includes(barcode)) {
      showSnackbar({
        message: "This item is not in the customer's bag",
        status: "error",
      })
      return false
    }
    return true
  }

  const [processReturn] = useMutation(PROCESS_RETURN, {
    onCompleted: () => {
      showSnackbar({
        message: "Items have been successfully returned",
        status: "success",
      })
      refresh()
      setPhysicalProducts([])
      setProductStates({})
      setTrackingNumber("")
      setBarcode("")
      setSequenceNumber("")
      setDroppedOffBy("UPS")
      barcodeMaps = {}
      onClose?.()
    },
    onError: error => {
      showSnackbar({
        message: error?.message,
        status: "error",
      })
    },
  })

  const [submitQAEntry] = useMutation(SUBMIT_QA_ENTRY)

  const inputRef = useRef()
  //   const shouldAllowSave = filter(values(productStates), a => a.returned).length > 0 && !!trackingNumber
  const focusOnInput = () => {
    const target: any = inputRef?.current
    target?.focus()
  }

  const [newPhysicalProduct, { loading, data }] = useLazyQuery(GET_PHYSICAL_PRODUCT_FOR_MULTI_ITEM_RETURN, {
    variables: { sequenceNumber: sequenceNumber },
  })

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

  useEffect(() => {
    const physicalProduct = data?.physicalProducts[0]
    if (physicalProduct) {
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
  }, [loading, data])

  const handleBarcodeChange = e => {
    const input = trim(e.target.value)
    if (input.match(PHYSICAL_PRODUCT_BARCODE_REGEX)) {
      const getSequenceNumber = input => {
        for (let i = 4; i <= input.length; i++) {
          if (input[i] > 0) {
            return parseInt(input.slice(i))
          }
        }
      }
      const inProductStates = productStates[input] === undefined
      if (inProductStates) {
        if (inBagCheck(input)) {
          setSequenceNumber(getSequenceNumber(input))
        }
      } else {
        showSnackbar({
          message: `Item already scanned for return`,
          status: "error",
        })
      }
      setBarcode("")
    } else if (input.match(RETURN_LABEL_BARCODE_REGEX)) {
      droppedOffBy === "UPS" ? setTrackingNumber(input) : setTrackingNumber("")
      setBarcode("")
    } else {
      setBarcode(input)
    }
  }

  const handleSave = () => {
    const productStateArr = Object.values(productStates) as any[]

    for (let i = 0; i < productStateArr.length; i++) {
      const productState = productStateArr[i]
      const product = physicalProducts[i]
      submitQAEntry({
        variables: {
          notes: productState.notes,
          type: productState.damageType?.[0],
          damageTypes: productState.damageType,
          physicalProductID: product.id,
          userID: session.user.id,
          published: false,
        },
      })
    }

    processReturn({
      variables: {
        trackingNumber: trackingNumber,
        productStates: Object.values(productStates).map((productState: any) => omit(productState, "damageType")),
        droppedOffBy: droppedOffBy,
        customerId,
      },
    })
  }
  const shouldAllowSave =
    droppedOffBy === "UPS" ? physicalProducts.length > 0 && trackingNumber.length > 0 : physicalProducts.length > 0

  const handleRemove = index => {
    const productBarcode = physicalProducts[index]?.barcode
    setPhysicalProducts([...physicalProducts.slice(0, index), ...physicalProducts.slice(index + 1)])
    const remainingProductStates = productStates
    delete remainingProductStates[productBarcode]
    setProductStates({ ...remainingProductStates })
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
          Process return
        </DialogTitle>
        <DialogContent dividers>
          <Box my={2} width={["550px"]}>
            <TextField
              label="Scan barcode"
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
          <Box>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">Dropped off by</InputLabel>
              <Select
                id="process-return-damage-type"
                labelId="demo-simple-select-outlined-label"
                value={droppedOffBy}
                onChange={e => {
                  setDroppedOffBy(e.target.value)
                }}
                label="Dropped Off By"
                fullWidth
              >
                <MenuItem value="Customer">Customer</MenuItem>
                <MenuItem value="UPS">UPS</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box my={1}>
            {droppedOffBy === "UPS" ? (
              <TrackingNumberCheckCircle trackingNumber={trackingNumber} />
            ) : (
              <Card elevation={1}>
                <Box display="flex" justifyContent="center" width="100%" py={2}>
                  <Typography variant="h5">No tracking label needed when the customer dropped off items</Typography>
                </Box>
              </Card>
            )}
          </Box>

          <Box mt={1} mb={2}>
            {physicalProducts.map((product, index) => {
              return (
                <ProcessReturnProductCard
                  key={product.id}
                  index={index}
                  product={product}
                  productState={productStates[product.barcode]}
                  onStateChange={state => {
                    setProductStates({
                      ...productStates,
                      [product.barcode]: state,
                    })
                  }}
                  onRemove={index => {
                    handleRemove(index)
                  }}
                />
              )
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => handleSave()}
            color="primary"
            variant="contained"
            disabled={!shouldAllowSave}
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
