import React from "react"
import { Box, Card, colors, Typography } from "@material-ui/core"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import styled from "styled-components"
import { Spacer } from "components"

interface TrackingNumber {
  trackingNumber: string
}

export const TrackingNumberCheckCircle: React.FC<TrackingNumber> = ({ trackingNumber }) => {
  return (
    <>
      <Card elevation={1}>
        {trackingNumber ? (
          <TrackingNumber width="100%" py={3}>
            <CheckCircleIcon htmlColor={colors.green[500]} />
            <Spacer m={1} />
            <Typography variant="h5">Tracking Number: {trackingNumber}</Typography>
          </TrackingNumber>
        ) : (
          <TrackingNumber width="100%" py={3}>
            <CheckCircleIcon />
            <Spacer m={1} />
            <Typography variant="h5"> Please scan the label from the return package</Typography>
          </TrackingNumber>
        )}
      </Card>
    </>
  )
}

const TrackingNumber = styled(Box)`
  display: flex;
  justify-content: center;
`
