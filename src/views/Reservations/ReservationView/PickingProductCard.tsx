import React, { useState, useEffect } from "react"
import styled from "styled-components"

import { Typography, Grid, Box, Paper, Divider } from "@material-ui/core"
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

export const PickingProductCard = ({ product, productState, onStateChange }) => {
  const [values, setValues] = useState(productState ?? { productStatus: "Dirty", picked: false, notes: "" })
  const { warehouseLocation } = product

  useEffect(() => {
    setValues({
      ...values,
      picked: productState.picked,
    })
  }, [productState.picked])

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
                  <Typography variant="body1" color="secondary" style={{ letterSpacing: 1, fontSize: 14 }}>
                    {product.seasonsUID}
                  </Typography>
                </Box>
                <Box>{productState.picked && <CheckCircleIcon />}</Box>
              </Box>
            </Box>

            <Divider />

            <Box display="flex" flexDirection="row">
              <Box m={1} flexDirection="column">
                <Typography variant="body1" color="textSecondary">
                  Type
                </Typography>
                <Typography variant="h3" color="textSecondary">
                  {warehouseLocation.type}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box m={1} flexDirection="column">
                <Typography variant="body1" color="textSecondary">
                  Location
                </Typography>
                <Typography variant="h3" color="textSecondary">
                  {warehouseLocation.locationCode}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box m={1} flexDirection="column">
                <Typography variant="body1" color="textSecondary">
                  Item
                </Typography>
                <Typography variant="h3" color="textSecondary">
                  {warehouseLocation.itemCode}
                </Typography>
              </Box>
            </Box>

            <Divider />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
