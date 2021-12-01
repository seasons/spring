import React, { useState } from "react"
import {
  Box,
  Button,
  TextField as MuiTextField,
  Dialog,
  Grid,
  DialogContent,
  IconButton,
  Typography,
  Link,
} from "@material-ui/core"
import { useRefresh } from "@seasons/react-admin"
import { DialogTitle, Spacer, Text } from "components"
import { Form } from "react-final-form"
import { Mutator } from "final-form"
import CloseIcon from "@material-ui/icons/Close"
import styled from "styled-components"
import { useLazyQuery, useMutation } from "react-apollo"
import { Link as RouterLink } from "react-router-dom"
import { gql } from "graphql-tag"
import { useEffect } from "react"
import { useSnackbarContext } from "components/Snackbar"
import { ContactSupportOutlined } from "@material-ui/icons"

const SWAP_BAG_ITEM = gql`
  mutation swapBagItem($oldItemID: ID!, $seasonsUID: String!) {
    swapBagItem(oldItemID: $oldItemID, seasonsUID: $seasonsUID) {
      id
    }
  }
`

const GET_PHYSICAL_PRODUCT = gql`
  query physicalProduct($seasonsUID: String) {
    physicalProduct(where: { seasonsUID: $seasonsUID }) {
      id
      seasonsUID
      productVariant {
        id
        displayShort
        product {
          id
          name
          brand {
            id
            name
          }
          images {
            id
            url
          }
        }
      }
    }
  }
`

export const SwapBagItemModal = ({ open, onClose, customer, bagItem }) => {
  const refresh = useRefresh()
  const [selectedPhysicalProduct, setSelectedPhysicalProduct] = useState(null as any)
  const [physicalProductSeasonsUID, setPhysicalProductSeasonsUID] = useState("")
  const [getPhysicalProduct, { loading, data }] = useLazyQuery(GET_PHYSICAL_PRODUCT)
  const initialState = {
    status: "Reserved",
    saved: false,
  }
  const setValue: Mutator = ([name, newValue], state, { changeValue }) => {
    changeValue(state, name, value => newValue)
  }

  const { showSnackbar } = useSnackbarContext()

  const [swapBagItem] = useMutation(SWAP_BAG_ITEM, {
    onCompleted: () => {
      showSnackbar({
        message: "Bag item swapped",
        status: "success",
      })
      refresh()
      onClose()
    },
    onError: error => {
      showSnackbar({
        message: error?.message,
        status: "error",
      })
    },
  })

  useEffect(() => {
    if (physicalProductSeasonsUID?.length >= 17) {
      getPhysicalProduct({
        variables: {
          seasonsUID: physicalProductSeasonsUID,
        },
      })
    }
  }, [physicalProductSeasonsUID, getPhysicalProduct])

  useEffect(() => {
    if (data?.physicalProduct) {
      setSelectedPhysicalProduct(data?.physicalProduct)
    }
  }, [data, loading])

  const productVariant = selectedPhysicalProduct?.productVariant
  const physicalProduct = selectedPhysicalProduct
  const product = productVariant?.product
  const image = product?.images?.[0]?.url

  const handleSubmit = () => {
    swapBagItem({
      variables: {
        oldItemID: bagItem.id,
        seasonsUID: physicalProduct?.seasonsUID,
      },
    })
  }

  if (!open) {
    return null
  }

  return (
    <Dialog onClose={onClose} aria-labelledby="assign-roles" open={open}>
      <DialogTitle id="assign-roles" onClose={() => onClose?.()}>
        Swap this bag item
      </DialogTitle>
      <DialogContent dividers>
        <Form
          initialValues={initialState}
          onSubmit={handleSubmit}
          subscription={{ submitting: true, pristine: true }}
          mutators={{ setValue }}
        >
          {({
            handleSubmit,
            form: {
              mutators: { setValue },
            },
            values: formValues,
            errors,
          }) => {
            return (
              <Box style={{ width: "1000px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Text variant="h6">Physical Product Seasons UID</Text>
                    <Text variant="caption">Paste in the physical product seasons UID</Text>
                    <Spacer mt={1} />
                    <MuiTextField
                      fullWidth
                      onChange={event => setPhysicalProductSeasonsUID(event.target.value)}
                      placeholder="Seasons UID"
                      value={physicalProductSeasonsUID}
                      variant="outlined"
                    />
                    <Spacer mt={2} />
                    <Box my={4}>
                      <Button autoFocus onClick={handleSubmit} color="primary" variant="contained">
                        Swap item
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={8}>
                    {productVariant?.id && (
                      <>
                        <Text variant="h6">Selected physical product</Text>
                        <Spacer mt={1} />
                        <Box mt={2} style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                          <Box style={{ position: "relative", width: "150px", padding: "4px" }}>
                            <RemoveWrapper>
                              <IconButton onClick={() => setSelectedPhysicalProduct(null)}>
                                <CloseIcon />
                              </IconButton>
                            </RemoveWrapper>
                            <Box mb={3}>
                              {image && <img style={{ width: "100%" }} alt="" src={image} />}
                              <Box display="flex" flexDirection="row" mt={1}>
                                <Box flex={1}>
                                  <Link
                                    color="textPrimary"
                                    component={RouterLink}
                                    to={`/inventory/products/${product.id}`}
                                  >
                                    <Typography variant="body2" color="textPrimary">
                                      {product?.name}
                                    </Typography>
                                  </Link>
                                  <Typography variant="body2" color="textPrimary">
                                    {product?.brand?.name}
                                  </Typography>
                                  <Typography variant="body2" color="textPrimary">
                                    {`Size ${productVariant?.displayShort}`}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Box>
            )
          }}
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const RemoveWrapper = styled("div")`
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 2;
`
