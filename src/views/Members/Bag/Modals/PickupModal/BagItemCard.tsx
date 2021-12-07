import React from "react"
import styled from "styled-components"
import { Typography, Box, Paper, Button } from "@material-ui/core"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"

const Image = styled.img`
  margin-right: 5px;
  height: 100%;
`

export const BagItemCard = ({ bagItem, onClick, selectedBagItems }) => {
  const product = bagItem?.productVariant?.product
  const selected = selectedBagItems.includes(bagItem.id)

  return (
    <Box my={1}>
      <Paper variant="outlined">
        <Box display="flex" width={350}>
          <Box>
            <Image src={product?.images?.[0]?.url} width={100} height={125} />
          </Box>

          <Box flexGrow={1} justifyContent="space-between" flexDirection="column" display="flex">
            <Box my={2}>
              <Box display="flex" height="30px">
                <Box flexGrow={1} p={1}>
                  <Typography variant="body1" color="secondary" style={{ letterSpacing: 1, fontSize: 18 }}>
                    {bagItem?.physicalProduct?.seasonsUID}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box p={1} alignItems="center" display="flex" justifyContent="space-between">
              <Box>
                {selected && (
                  <Box display="flex" alignItems="center">
                    <CheckCircleIcon />
                    <Box mr={1} />
                    <Typography>Selected</Typography>
                  </Box>
                )}
              </Box>
              <Button onClick={() => onClick(bagItem)} variant="contained">
                Select
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
