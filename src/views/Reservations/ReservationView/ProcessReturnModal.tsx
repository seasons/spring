import React from "react"
import styled from "styled-components"

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Checkbox,
  Box,
  Paper,
} from "@material-ui/core"
import { GetReservation, GetReservation_products } from "generated/GetReservation"

interface ProcessReturnModalProps {
  open: boolean
  onClose?: () => void
  onSave?(values: {}): void
  reservation: GetReservation
}

const Image = styled.img`
  margin-right: 5px;
`

const ProductImage = ({ product }: { product: GetReservation_products }) => {
  const image = product?.productVariant?.product.images?.[0]
  return <Image src={image?.url} width={85} height={107} />
}

export const ProcessReturnModal: React.FC<ProcessReturnModalProps> = ({ open, onSave, onClose, reservation }) => {
  // TODO add status updates and notes for reservation return
  // Add Scanner to this view to process reservation
  // Move checkbox ("Mark as returned") an a more options menu

  // 1. After that set all products to the in cleaning
  // (Guided Stow) Part of the return flow is tell where each item should go back to

  // Picking flow, New to Pick
  // Start Picking
  // allow them to scan the barcode to set the status of an item as picked
  // 1. scan all items
  // 2. print label
  // 3. set to ready to ship
  // 3. set reservation to shipped by scanning label

  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title">Process Return</DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle1" color="textSecondary">
          Mark as returned
        </Typography>
        <Box flex>
          {reservation.products.map(product => (
            <Box my={1}>
              <Paper variant="outlined">
                <Grid item container spacing={1}>
                  <Grid item md={2}>
                    <Box mx={1} alignItems="center" height="100%">
                      <Checkbox />
                    </Box>
                  </Grid>
                  <Grid item>
                    <ProductImage product={product} />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" color="textSecondary">
                      {product.seasonsUID}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onSave} color="primary">
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  )
}
