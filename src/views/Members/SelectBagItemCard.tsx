import React from "react"
import styled from "styled-components"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import { Typography, Box, Paper, colors } from "@material-ui/core"

import { GetReservation_products } from "generated/GetReservation"

const Image = styled.img`
  margin-right: 5px;
  height: 100%;
`

export const SelectBagItemCard = ({ bagItem, isSelected, onSelect }) => {
  const product = bagItem.productVariant.product
  const brand = product?.brand.name
  const productName = product?.name
  const image = product?.images[0]

  const greenColor = colors.green[400]
  const color = isSelected ? greenColor : "white"

  return (
    <div onClick={() => onSelect?.(!isSelected, bagItem.id)}>
      <Paper
        variant="outlined"
        style={{ borderStyle: "solid", borderColor: isSelected ? greenColor : colors.grey[300], borderWidth: "2px" }}
      >
        <Box display="flex">
          <Box>
            <Image src={image?.url} width={150} height={200} />
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
