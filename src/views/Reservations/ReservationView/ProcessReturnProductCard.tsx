import React, { useState, useEffect } from "react"
import styled from "styled-components"

import { Typography, Grid, Box, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import { GetReservation_products } from "generated/GetReservation"

const Image = styled.img`
  margin-right: 5px;
`

const ProductImage = ({ product }: { product: GetReservation_products }) => {
  const image = product?.productVariant?.product.images?.[0]
  return <Image src={image?.url} width={200} height={250} />
}

export const ProcessReturnProductCard = ({ product, productState, onStateChange }) => {
  const [values, setValues] = useState(productState ?? { productStatus: "Dirty", returned: false, notes: "" })

  useEffect(() => {
    setValues({
      ...values,
      returned: productState.returned,
    })
  }, [productState.returned])

  return (
    <Box my={1}>
      <Paper variant="outlined">
        <Grid item container spacing={1}>
          <Grid item>
            <ProductImage product={product} />
          </Grid>
          <Grid md={7} item>
            <Box my={2}>
              <Box display="flex" height="30px">
                <Box flexGrow={1}>
                  <Typography variant="body1" color="textSecondary">
                    {product.seasonsUID}
                  </Typography>
                </Box>
                <Box>{productState.returned && <CheckCircleIcon />}</Box>
              </Box>
            </Box>

            <Box my={1}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">Product Status</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={values.productStatus}
                  onChange={e => {
                    const newValue = e.target.value
                    const updatedState = {
                      ...values,
                      productStatus: newValue,
                    }

                    setValues(updatedState)
                    onStateChange(values)
                  }}
                  label="Product Status"
                  disabled={!productState.returned}
                  fullWidth
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Dirty"}>Dirty</MenuItem>
                  <MenuItem value={"Damaged"}>Damaged</MenuItem>
                  <MenuItem value={"PermanentlyDamaged"}>Permanently Damaged</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <TextField
                label="Notes"
                name="notes"
                type="text"
                variant="outlined"
                onChange={e => {
                  setValues({
                    ...values,
                    notes: e.target.value,
                  })
                  onStateChange(values)
                }}
                onBlur={e => {
                  onStateChange(values)
                }}
                value={values.note}
                disabled={!productState.returned}
                rows={4}
                fullWidth
                multiline
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
