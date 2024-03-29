import React, { useState, useEffect } from "react"
import styled from "styled-components"
import gql from "graphql-tag"

import { Typography, Box, Paper, Divider } from "@material-ui/core"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import { GetReservation_products } from "generated/GetReservation"

const Image = styled.img`
  margin-right: 5px;
  height: 100%;
`

export const PickingPackingProductCardFragment_BagItem = gql`
  fragment PickingPackingProductCardFragment_BagItem on BagItem {
    physicalProduct {
      id
      seasonsUID
      warehouseLocation {
        id
        type
        locationCode
        itemCode
      }
      productVariant {
        id
        product {
          id
          images {
            id
            url
          }
        }
      }
    }
  }
`

export const PickingPackingProductCard = ({ bagItem, productState, onStateChange, donePicking }) => {
  const [values, setValues] = useState(productState ?? { productStatus: "Dirty", picked: false, notes: "" })
  const product = bagItem?.productVariant?.product
  const warehouseLocation = bagItem?.physicalProduct?.warehouseLocation

  const picked = productState?.picked

  useEffect(() => {
    setValues({
      ...values,
      picked,
    })
  }, [picked, setValues])

  return (
    <Box my={1}>
      <Paper variant="outlined">
        <Box display="flex">
          <Box>
            <Image src={product?.images?.[0]?.url} width={100} height={125} />
          </Box>
          <Box flexGrow={1}>
            <Box my={2}>
              <Box display="flex" height="30px">
                <Box flexGrow={1} p={1}>
                  <Typography variant="body1" color="secondary" style={{ letterSpacing: 1, fontSize: 18 }}>
                    {bagItem?.physicalProduct?.seasonsUID}
                  </Typography>
                </Box>
                <Box py={"5px"} px={2}>
                  {(donePicking || picked) && <CheckCircleIcon />}
                </Box>
              </Box>
            </Box>

            <Divider />

            <Box display="flex" flexDirection="row">
              <Box m={1} flexDirection="column">
                <Typography variant="body1" color="textSecondary">
                  Type
                </Typography>
                <Typography variant="h3" color="textSecondary">
                  {warehouseLocation?.type || "-"}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box m={1} flexDirection="column">
                <Typography variant="body1" color="textSecondary">
                  Location
                </Typography>
                <Typography variant="h3" color="textSecondary">
                  {warehouseLocation?.locationCode || "-"}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box m={1} flexDirection="column">
                <Typography variant="body1" color="textSecondary">
                  Item
                </Typography>
                <Typography variant="h3" color="textSecondary">
                  {warehouseLocation?.itemCode || "-"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
