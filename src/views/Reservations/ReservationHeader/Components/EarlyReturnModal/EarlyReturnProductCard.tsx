import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Typography, Box, Paper, colors, Button } from "@material-ui/core"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import { GetReservation_products } from "generated/GetReservation"

const Image = styled.img`
  margin-right: 5px;
  height: 100%;
`

const ProductImage = ({ product }: { product: GetReservation_products }) => {
  const image = product?.productVariant?.product.images?.[0]
  return <Image src={image?.url} width={200} height={250} />
}

export const EarlyReturnProductCard = ({ product, setSelectedProductsIDs, selectedProductsIDs }) => {
  const [selected, setSelected] = useState(false)
  const handleClick = product => {
    setSelected(!selected)
    if (selectedProductsIDs?.includes(product.id)) {
      console.log(product.id)
      return setSelectedProductsIDs([...selectedProductsIDs.filter(a => a != product.id)])
    }
    console.log(product.id)
    return setSelectedProductsIDs([...selectedProductsIDs, product.id])
  }
  return (
    <div onClick={() => handleClick(product)}>
      <Paper variant="outlined">
        <Box display="flex">
          <Box>
            <ProductImage product={product} />
          </Box>
          <Box flexGrow={1} px={2}>
            <Box my={2}>
              <Box display="flex" height="30px">
                <Box flexGrow={1} display="flex" justifyContent="space-between">
                  <Typography variant="body1" color="textSecondary">
                    SeasonsUID:
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {product.seasonsUID}
                  </Typography>
                </Box>
              </Box>
              <Box display={"flex"} pt={1} justifyContent={"space-between"}>
                <Typography variant="body1" color="textSecondary">
                  Selected for early return:
                </Typography>
                {selected ? <CheckCircleIcon htmlColor={colors.green[500]} /> : <CheckCircleIcon />}
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </div>
  )
}
