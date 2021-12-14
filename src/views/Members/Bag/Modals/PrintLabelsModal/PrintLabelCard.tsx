import { Box, Button, Link, Typography, styled } from "@material-ui/core"
import { Alert } from "@material-ui/lab"

import React from "react"

export const PrintLabelCard = ({ data }) => {
  if (!data) {
    return null
  }

  const { shippingLabel, direction } = data

  if (!shippingLabel) {
    return (
      <Box pt={2}>
        <Alert severity="info">Need to generate label</Alert>
      </Box>
    )
  }

  const { trackingNumber, image, trackingURL } = shippingLabel
  return (
    <>
      <Box py={1}>
        <Typography variant="caption">Shipping method</Typography>
        <Typography variant="body1">{direction}</Typography>
      </Box>
      <FlexBox display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Link
            variant="body1"
            onClick={e => {
              window.open(trackingURL, "_blank")
            }}
          >
            <Typography color="secondary">{trackingNumber}</Typography>
          </Link>
        </Box>
        <Box ml={4} my={2}>
          <Button
            variant="outlined"
            onClick={() => {
              window.open(image, "_blank")
            }}
          >
            Print
          </Button>
        </Box>
      </FlexBox>
    </>
  )
}

const FlexBox = styled(Box)({
  height: "100%",
  width: "auto",
})
