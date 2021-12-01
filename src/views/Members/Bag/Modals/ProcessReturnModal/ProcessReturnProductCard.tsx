import React, { useState, useEffect } from "react"
import styled from "styled-components"

import {
  Typography,
  Box,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core"
import { GetReservation_products } from "generated/GetReservation"
import CloseIcon from "@material-ui/icons/Close"

const Image = styled.img`
  margin-right: 5px;
  height: 100%;
`

const ProductImage = ({ product }: { product: GetReservation_products }) => {
  const image = product?.productVariant?.product.images?.[0]
  return <Image src={image?.url} width={200} height={250} />
}

export const ProcessReturnProductCard = ({ product, productState, onStateChange, onRemove, index }) => {
  const [values, setValues] = useState(
    productState ?? { productStatus: "Dirty", damageType: [], returned: false, notes: "" }
  )
  useEffect(() => {
    onStateChange(values)
  }, [values])

  return (
    <Box my={1}>
      <Paper variant="outlined">
        <Box display="flex">
          <Box>
            <ProductImage product={product} />
          </Box>
          <Box flexGrow={1} px={2}>
            <Box display="flex" justifyContent="space-between">
              <Box my={2}>
                <Box display="flex" height="30px">
                  <Box flexGrow={1}>
                    <Typography variant="body1" color="textSecondary">
                      {product.seasonsUID}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <RemoveWrapper>
                <IconButton aria-label="close" onClick={() => onRemove(index)}>
                  <CloseIcon />
                </IconButton>
              </RemoveWrapper>
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
                  }}
                  label="Product Status"
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
            <Box mb={1}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="process-return-damage-type">Damage Types</InputLabel>
                <Select
                  id="process-return-damage-type"
                  label="Damage Type"
                  variant="outlined"
                  value={values.damageType}
                  onChange={e => {
                    const newValue = e.target.value
                    const updatedState = {
                      ...values,
                      damageType: newValue,
                    }

                    setValues(updatedState)
                    onStateChange(values)
                  }}
                  multiple
                  fullWidth
                >
                  <MenuItem value="BarcodeMissing">Barcode Missing</MenuItem>
                  <MenuItem value="ButtonMissing">Button Missing</MenuItem>
                  <MenuItem value="Stain">Stain</MenuItem>
                  <MenuItem value="Smell">Smell</MenuItem>
                  <MenuItem value="Tear">Tear</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
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
                rows={4}
                fullWidth
                multiline
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

const RemoveWrapper = styled.div`
  position: relative;
  top: 0;
  right: 0;
  height: 0;
`
