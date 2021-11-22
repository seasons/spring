import React, { useEffect, useRef, useState } from "react"

import { Button, Dialog, DialogContent, DialogActions, Box, TextField, Typography, Card } from "@material-ui/core"
import { DialogTitle, Spacer } from "components"
import { PickingPackingProductCard, PickingPackingProductCardFragment_BagSection } from "./PickingPackingProductCard"
import { Alert } from "@material-ui/lab"
import { PHYSICAL_PRODUCT_BARCODE_REGEX } from "views/constants"
import { trim, isEmpty } from "lodash"
import { useSnackbarContext } from "components/Snackbar"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { PACK_ITEMS, PICK_ITEMS } from "views/Reservations/mutations"

export const PickingPackingModalFragment_BagSection = gql`
  fragment PickingPackingModalFragment_BagSection on BagSection {
    id
    bagItems {
      id
      physicalProduct {
        id
        barCode
        seasonsUID
      }
      productVariant {
        id
        product {
          id
        }
      }
    }
    ...PickingPackingProductCardFragment_BagSection
  }
  ${PickingPackingProductCardFragment_BagSection}
`

interface ProductState {
  bagItemID: string
  productUID: string
  picked: boolean
}

interface PickingPackingModalProps {
  open: boolean
  onClose?: () => void
  onSave?: (values: ProductStates, params?: any) => void
  bagItems: any
  mode: "Pick" | "Pack"
}

type ProductStates = { [key: string]: ProductState }

export const PickingPackingModal: React.FC<PickingPackingModalProps> = ({ open, onSave, onClose, bagItems, mode }) => {
  const [productStates, setProductStates] = useState<ProductStates>({})
  const [pickItems] = useMutation(PICK_ITEMS)
  const [packItems] = useMutation(PACK_ITEMS)

  useEffect(() => {
    if (isEmpty(productStates) && bagItems?.length > 0) {
      const barcodeMaps = {}
      bagItems?.forEach(bagItem => {
        console.log("bagItem", bagItem)
        const physicalProduct = bagItem.physicalProduct
        barcodeMaps[physicalProduct.barcode] = {
          bagItemID: bagItem.id,
          productUID: physicalProduct.seasonsUID,
          picked: false,
        }
      })
      setProductStates(barcodeMaps)
    }
  }, [bagItems, setProductStates])

  console.log("barcodeMaps", productStates)
  // FIXME:
  // const { shippingLabel } = reservation?.sentPackage!
  const shippingLabel = { image: "" }

  const [barcode, setBarcode] = useState("")
  const [shouldAllowSave, setShouldAllowSave] = useState(false)

  // FIXME:
  // const alreadyPacked = reservation.status === "Packed"
  const alreadyPacked = false

  const inputRef = useRef()

  const focusOnInput = () => {
    const target: any = inputRef?.current
    target?.focus()
  }

  const handleSave = async status => {
    const fn = mode === "Pick" ? pickItems : packItems

    await fn({
      variables: {
        ids: Object.values(productStates)
          .filter(p => p.picked)
          .map(p => p.bagItemID),
      },
    })

    onSave?.(productStates, { status })
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
        const updatedProductStates = {
          ...productStates,
          [input]: {
            ...productState,
            picked: true,
          },
        }
        setProductStates(updatedProductStates)
        setShouldAllowSave(true)

        const pickedCount = Object.values(updatedProductStates).filter((a: any) => !!a.picked).length
        // FIXME:
        // setShouldAllowSave(pickedCount === reservation?.newProducts?.length)
      } else {
        showSnackbar({
          message: `Barcode not found 222`,
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

  const title = mode === "Pick" ? "Pick items" : "Pack items"
  const listItemOneTitle = mode === "Pick" ? "Picking items" : "Packing items"

  return (
    <>
      <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          {alreadyPacked ? (
            <Box mb={1}>
              <Alert severity="info">Items were already packed.</Alert>
            </Box>
          ) : (
            <Box my={2} width={["400px"]}>
              <TextField
                label="Scan barcode"
                helperText="Click into box and scan the barcode to mark as picked"
                name="barcode"
                type="text"
                variant="outlined"
                onChange={handleBarcodeChange}
                value={barcode}
                inputRef={inputRef}
                disabled={alreadyPacked}
                fullWidth
              />
            </Box>
          )}
          <Box mt={2} mb={2}>
            <Typography variant="subtitle1">{`1. ${listItemOneTitle}`}</Typography>
            {bagItems.map(bagItem => {
              const physicalProduct = bagItem.physicalProduct

              return (
                <Box mb={2} key={physicalProduct.id}>
                  <PickingPackingProductCard
                    bagItem={bagItem}
                    productState={productStates[physicalProduct.barcode]}
                    donePicking={alreadyPacked}
                    onStateChange={state => {
                      setProductStates({
                        ...productStates,
                        [physicalProduct.barcode]: state,
                      })
                    }}
                  />
                </Box>
              )
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => handleSave(mode)}
            color="primary"
            variant="contained"
            disabled={!shouldAllowSave}
          >
            Mark as {mode}ed
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
