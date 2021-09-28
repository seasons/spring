import React from "react"
import styled from "styled-components"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import { Typography, Box, Paper, colors } from "@material-ui/core"

import { GetReservation_products } from "generated/GetReservation"

const Image = styled.img`
  margin-right: 5px;
  height: 100%;
`

const ProductImage = ({ product }: { product: GetReservation_products }) => {
  const image = product?.productVariant?.product.images?.[0]
  return <Image src={image?.url} width={150} height={200} />
}

export const SelectProductCard = ({ product, isSelected, onSelect }) => {
  const brand = product?.productVariant?.product?.brand?.name
  const productName = product?.productVariant?.product?.name

  const greenColor = colors.green[400]
  const color = isSelected ? greenColor : "white"

  return (
    <div onClick={() => onSelect?.(!isSelected)}>
      <Paper
        variant="outlined"
        style={{ borderStyle: "solid", borderColor: isSelected ? greenColor : colors.grey[300], borderWidth: "2px" }}
      >
        <Box display="flex">
          <Box>
            <ProductImage product={product} />
          </Box>

          <Box p={2} flexGrow={1} display="flex" flexDirection="horizontal" justifyContent="space-between">
            <Box>
              <Box pb={1}>
                <Typography variant="h5">{brand}</Typography>
              </Box>
              <Box pb={1}>
                <Typography variant="body1">{productName}</Typography>
              </Box>
              <Box pb={1}>
                <Typography variant="body1" color="textSecondary">
                  {product.seasonsUID}
                </Typography>
              </Box>
            </Box>
            <Box>
              <CheckCircleIcon htmlColor={color} />
            </Box>
          </Box>
        </Box>
      </Paper>
    </div>
  )
}
