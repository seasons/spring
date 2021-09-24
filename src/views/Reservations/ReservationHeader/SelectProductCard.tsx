import React, { useState } from "react"
import styled from "styled-components"
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

export const SelectProductCard = ({ product, setSelectedProductsIDs, selectedProductsIDs }) => {
  const [selected, setSelected] = useState(false)
  const brand = product?.productVariant?.product?.brand?.name
  const productName = product?.productVariant?.product?.name
  const handleClick = product => {
    setSelected(!selected)
    if (selectedProductsIDs?.includes(product.id)) {
      return setSelectedProductsIDs([...selectedProductsIDs.filter(a => a != product.id)])
    }
    return setSelectedProductsIDs([...selectedProductsIDs, product.id])
  }

  return (
    <div
      onClick={() => handleClick(product)}
      style={{ borderStyle: "solid", borderColor: selected ? colors.green[500] : "white", borderRadius: "8px" }}
    >
      <Paper variant="outlined">
        <Box display="flex">
          <Box>
            <ProductImage product={product} />
          </Box>
          <Box flexGrow={1} px={2}>
            <Box my={2}>
              <Box pb={1}>
                <Typography variant="body1">{productName}</Typography>
              </Box>
              <Box pb={1}>
                <Typography variant="body1">{brand}</Typography>
              </Box>
              <Box pb={1}>
                <Typography variant="body1" color="textSecondary">
                  {product.seasonsUID}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </div>
  )
}
