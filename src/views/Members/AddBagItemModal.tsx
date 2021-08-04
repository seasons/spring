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
import { SelectField } from "fields"
import { DialogTitle, Spacer, Text } from "components"
import { Form } from "react-final-form"
import { Mutator } from "final-form"
import CloseIcon from "@material-ui/icons/Close"
import { SelectChoice } from "fields/SelectField"
import styled from "styled-components"
import { useLazyQuery, useMutation } from "react-apollo"
import { Link as RouterLink } from "react-router-dom"
import { gql } from "apollo-boost"
import { useEffect } from "react"
import { useSnackbarContext } from "components/Snackbar"

const ADD_BAG_ITEM = gql`
  mutation addToBag($customerID: ID!, $item: ID!, $status: BagItemStatus!, $saved: Boolean!) {
    addToBag(customerID: $customerID, item: $item, saved: $saved, status: $status) {
      id
    }
  }
`

const GET_PRODUCT_VARIANT = gql`
  query productVariant($id: ID!) {
    productVariant(where: { id: $id }) {
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
`

const statusChoices: SelectChoice[] = [
  {
    value: "Added",
    display: "Added",
  },
  {
    value: "Reserved",
    display: "Reserved",
  },
]

const trueOrFalseChoices: SelectChoice[] = [
  {
    value: true,
    display: "True",
  },
  {
    value: false,
    display: "False",
  },
]

export const AddBagItemModal = ({ open, onClose, customer }) => {
  const refresh = useRefresh()
  const [selectedProductVariant, setSelectedProductVariant] = useState(null as any)
  const [productVariantID, setProductVariantID] = useState("")
  const [getProductVariant, { loading, data }] = useLazyQuery(GET_PRODUCT_VARIANT)
  const initialState = {
    status: "Reserved",
    saved: false,
  }
  const setValue: Mutator = ([name, newValue], state, { changeValue }) => {
    changeValue(state, name, value => newValue)
  }

  const { showSnackbar } = useSnackbarContext()

  const [addBagItem] = useMutation(ADD_BAG_ITEM, {
    onCompleted: () => {
      showSnackbar({
        message: "Bag item added",
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
    if (productVariantID?.length > 24) {
      getProductVariant({
        variables: {
          id: productVariantID,
        },
      })
    }
  }, [productVariantID, getProductVariant])

  useEffect(() => {
    if (data?.productVariant) {
      setSelectedProductVariant(data?.productVariant)
    }
  }, [data, loading])

  const productVariant = selectedProductVariant
  const product = productVariant?.product
  const image = product?.images?.[0]?.url

  const handleSubmit = values => {
    addBagItem({
      variables: {
        customerID: customer.id,
        item: productVariant.id,
        status: values.status,
        saved: values.saved,
      },
    })
  }

  if (!open) {
    return null
  }

  return (
    <Dialog onClose={onClose} aria-labelledby="assign-roles" open={open}>
      <DialogTitle id="assign-roles" onClose={() => onClose?.()}>
        Add a bag item
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
                    <Text variant="h6">Status</Text>
                    <Spacer mt={1} />
                    <SelectField name="status" choices={statusChoices} />
                    <Spacer mt={2} />
                    <Text variant="h6">Saved</Text>
                    <Text variant="caption">If saved item will appear in customer's saved items</Text>
                    <Spacer mt={1} />
                    <SelectField name="saved" choices={trueOrFalseChoices} />
                    <Spacer mt={2} />
                    <Text variant="h6">Product variant ID</Text>
                    <Text variant="caption">Paste in the product variant ID</Text>
                    <Spacer mt={1} />
                    <MuiTextField
                      fullWidth
                      onChange={event => setProductVariantID(event.target.value)}
                      placeholder="Variant ID"
                      value={productVariantID}
                      variant="outlined"
                    />
                    <Spacer mt={2} />
                    <Box my={4}>
                      <Button autoFocus onClick={handleSubmit} color="primary" variant="contained">
                        Add item
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={8}>
                    {productVariant?.id && (
                      <>
                        <Text variant="h6">Selected product variant</Text>
                        <Spacer mt={1} />
                        <Box mt={2} style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                          <Box style={{ position: "relative", width: "150px", padding: "4px" }}>
                            <RemoveWrapper>
                              <IconButton onClick={() => setSelectedProductVariant(null)}>
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
