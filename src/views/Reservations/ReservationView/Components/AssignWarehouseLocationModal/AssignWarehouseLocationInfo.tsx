import React from "react"
import styled from "styled-components"

import { Typography, Box, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core"
import { PhysicalProduct } from "generated/PhysicalProduct"

const Image = styled.img`
  margin-right: 5px;
  height: 100%;
`

const ProductImage = ({ product }: { product: PhysicalProduct }) => {
  const image = product?.productVariant?.product.images?.[0]
  return <Image src={image?.url} width={200} height={250} />
}

interface AssignWarehouseLocationInfoProps {
  product?: PhysicalProduct
  locations?: any[]
}

export const AssignWarehouseLocationInfo: React.FC<AssignWarehouseLocationInfoProps> = ({ product, locations }) => {
  if (!product) {
    return null
  }

  return (
    <Box my={1}>
      <Paper variant="outlined">
        <Box display="flex">
          <Box>
            <ProductImage product={product} />
          </Box>
          <Box flexGrow={1} px={2}>
            <Box my={2}>
              <Box display="flex" flexDirection="column">
                <Box pb={2}>
                  <Typography variant="overline" color="textSecondary">
                    Seasons UID
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    {product.seasonsUID}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="overline" color="textSecondary">
                    Previous Warehouse Location
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    {product?.warehouseLocation?.barcode || "Unknown"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
      <Box my={1}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="demo-simple-select-outlined-label">Location</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            onChange={e => {
              const newValue = e.target.value
            }}
            label="Product Status"
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {locations?.map(location => (
              <MenuItem value={location.id}>{location.barcode}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}
