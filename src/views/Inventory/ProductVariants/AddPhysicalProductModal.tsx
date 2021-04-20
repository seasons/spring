import React, { useEffect, useState } from "react"

import { Box, DialogContent, DialogActions, Button, Dialog, Typography } from "@material-ui/core"
import { PhysicalProductSummary } from "../PhysicalProducts/Components"
import PlusOneRoundedIcon from "@material-ui/icons/PlusOneRounded"
import styled from "styled-components"
import { Loader, Spacer } from "components"
import { gql } from "apollo-boost"
import { useMutation } from "react-apollo"
import { colors } from "theme/colors"
import { PRODUCT_EDIT_QUERY } from "../Products/queries"
import { VARIANT_EDIT_QUERY } from "./queries"
import { useSnackbarContext } from "components/Snackbar"

interface PickPhysicalProductModalProps {
  open: boolean
  setOpen?: (boolean) => void
  productVariant: any
  onSuccess?: () => void
}

const ADD_PHYSICAL_PRODUCTS = gql`
  mutation AddPhysicalProducts($variantID: ID!, $count: Int) {
    addPhysicalProductsToVariant(variantID: $variantID, count: $count) {
      id
    }
  }
`

export const AddPhysicalProductModal: React.FC<PickPhysicalProductModalProps> = ({
  open,
  productVariant,
  onSuccess,
}) => {
  const [isOpen, toggleOpen] = useState(open)
  const [isMutating, setIsMutating] = useState(false)

  const { showSnackbar } = useSnackbarContext()
  const [addPhysicalProductsToVariant] = useMutation(ADD_PHYSICAL_PRODUCTS, {
    onCompleted: () => {
      showSnackbar({
        message: `Successfully added ${physicalProducts.length -
          productVariant?.physicalProducts.length} physical products`,
        status: "success",
      })
      toggleOpen(false)
      setIsMutating(false)
      onSuccess?.()
    },
    onError: err => {
      setIsMutating(false)
      showSnackbar({
        message: err.message,
        status: "error",
      })
    },
    refetchQueries: [
      {
        query: PRODUCT_EDIT_QUERY,
        variables: { input: { id: productVariant?.product?.id } },
      },
      {
        query: VARIANT_EDIT_QUERY,
        variables: { where: { id: productVariant?.id } },
      },
    ],
  })
  const [physicalProducts, setPhysicalProducts] = useState(productVariant?.physicalProducts)

  useEffect(() => {
    toggleOpen(open)
  }, [open])

  const handleSave = () => {
    setIsMutating(true)
    addPhysicalProductsToVariant({
      variables: {
        variantID: productVariant?.id,
        count: physicalProducts.length,
      },
    })
  }

  return (
    <>
      <Dialog maxWidth="md" aria-labelledby="customized-dialog-title" open={isOpen}>
        <Box display="flex" flexDirection="row" alignItems="center" m={2}>
          <Typography variant="h4">Add physical products</Typography>
          <Box display="flex" flex={1} flexGrow={1} />
          <Box display="flex" alignItems="flex-end">
            <Button
              variant="contained"
              color="primary"
              startIcon={<PlusOneRoundedIcon />}
              onClick={() => {
                const num = String(productVariant?.physicalProducts.length + 1).padStart(2, "0")
                const newPhysicalProduct = {
                  seasonsUID: productVariant.sku + "-" + num,
                  inventoryStatus: "Reservable",
                  productStatus: "New",
                }

                setPhysicalProducts([...physicalProducts, newPhysicalProduct])
              }}
            >
              Add
            </Button>
          </Box>
        </Box>

        <DialogContent dividers>
          <Content>
            {physicalProducts?.map((physProd, index) => (
              <Box key={index}>
                <PhysicalProductSummary physicalProduct={physProd} key={index} />
                <Spacer mt={2} />
              </Box>
            ))}
          </Content>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              toggleOpen(false)
            }}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button autoFocus onClick={handleSave} color="secondary" variant="contained">
            {isMutating ? <Loader color={colors.white100} size={20} /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const Content = styled(Box)`
  min-width: 500px;
`
