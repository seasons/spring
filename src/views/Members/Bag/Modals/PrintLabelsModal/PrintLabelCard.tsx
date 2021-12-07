import { Box, Button, Link, Typography, Card, styled } from "@material-ui/core"
import React from "react"

export const PrintLabelCard = ({ data }) => {
  const { shippingLabel, direction } = data
  const { trackingNumber, image, trackingURL } = shippingLabel
  return (
    <Card>
      <FlexBox p={2} display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            {direction}
          </Typography>
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
    </Card>
  )
}

const FlexBox = styled(Box)({
  height: "100%",
  width: "auto",
})
