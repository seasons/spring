import React, { useState, useEffect } from "react"
import styled from "styled-components"

import { Typography, Box, Paper, TextField } from "@material-ui/core"
import { PhysicalProduct } from "generated/PhysicalProduct"
import { Autocomplete } from "@material-ui/lab"
import { Spacer } from "components"

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
  barcode?: string
  onChange?: (text: string) => void
}

export const AssignWarehouseLocationInfo: React.FC<AssignWarehouseLocationInfoProps> = ({
  barcode,
  product,
  locations,
  onChange,
}) => {
  const [currentBarcode, setCurrentBarcode] = useState(barcode)

  useEffect(() => {
    setCurrentBarcode(barcode)
  }, [barcode])

  if (!product) {
    return null
  }

  return (
    <>
      <Box mb={2}>
        <Autocomplete
          id="combo-box-demo"
          options={locations || []}
          onChange={e => {
            const id = (e.currentTarget as any).innerText
            console.log(id)
            setCurrentBarcode(id)
            onChange?.(id)
          }}
          value={currentBarcode}
          getOptionSelected={(option, value) => {
            return currentBarcode == option.barcode
          }}
          getOptionLabel={option => option.barcode || ""}
          renderInput={params => {
            return <TextField {...params} label="Select Location" variant="outlined" />
          }}
          clearOnBlur={false}
          autoSelect
        />
      </Box>
      <Box mt={6} mb={1}>
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
        <Box my={1} mt={2}>
          <Box mt={1}>
            <Typography variant="overline" color="textSecondary">
              New Warehouse Location
            </Typography>
            <Typography variant="h4" color="textSecondary">
              {currentBarcode || "-"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}
