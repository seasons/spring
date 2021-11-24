import { DialogTitle } from "components"

import { Box, Button, Dialog, DialogContent, DialogActions, Link, Typography, Card, styled } from "@material-ui/core"
import { Link as RouterLink } from "react-router-dom"
import React from "react"

interface PrintLabelsModalProps {
  open: boolean
  onClose?: () => void
  data: any
}

const PrintLabelCard = ({ data }) => {
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

export const PrintLabelsModal: React.FC<PrintLabelsModalProps> = ({ data, open, onClose }) => {
  return (
    <>
      <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
          Print Labels
        </DialogTitle>
        <DialogContent dividers>
          <Box mt={2} mb={2}>
            {data.map(pkg => {
              return (
                <Box mb={2}>
                  <PrintLabelCard data={pkg} />
                </Box>
              )
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose} color="primary" variant="contained">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const FlexBox = styled(Box)({
  height: "100%",
  width: "auto",
})
