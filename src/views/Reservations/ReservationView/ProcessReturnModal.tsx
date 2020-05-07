import React, { useState } from "react"
import styled from "styled-components"

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Divider,
  Checkbox,
  Box,
  Paper,
} from "@material-ui/core"
import { GetReservation, GetReservation_products } from "generated/GetReservation"
import { ProductImageField } from "views/Inventory/Products/ProductEdit"

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
  const image = product?.productVariant?.product.resizedImages?.[0]
  return <Image src={image.url} width={85} height={107} />
}

export const ProcessReturnModal: React.FC<ProcessReturnModalProps> = ({ open, onSave, onClose, reservation }) => {
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
