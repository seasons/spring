import React, { useState } from "react"
import { useQuery, useMutation } from "react-apollo"

import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core"
import { DialogTitle, Spacer } from "components"
import { UPDATE_PHYSICAL_PRODUCT } from "../../mutations"
import { ProductEditQuery_product_variants_physicalProducts } from "generated/ProductEditQuery"

interface OffloadPhysicalProductModalProps {
  open: boolean
  onClose?: () => void
  physicalProduct: ProductEditQuery_product_variants_physicalProducts
}

export const OffloadPhysicalProductModal: React.FC<OffloadPhysicalProductModalProps> = ({
  open,
  onClose,
  physicalProduct,
}) => {
  const [offloadMethod, setOffloadMethod] = useState("")
  const [offloadNotes, setOffloadNotes] = useState("")
  const [updatePhysicalProduct] = useMutation(UPDATE_PHYSICAL_PRODUCT)
  const onSave = async () => {
    const result = await updatePhysicalProduct({
      variables: {
        where: { id: physicalProduct.id },
        data: { offloadMethod, offloadNotes },
      },
    })
  }

  const offloadMethods = [
    { value: "SoldToUser", display: "Sold to user" },
    { value: "SoldToThirdParty", display: "Sold to third party" },
    { value: "ReturnedToVendor", display: "Returned to vendor" },
    { value: "Recycled", display: "Recycled" },
    { value: "Unknown", display: "Unknown" },
  ]

  const shouldAllowSave = offloadMethod !== ""

  return (
    <>
      <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
          Offload physical product
        </DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" width={550}>
            <Box display="flex" height="30px">
              <Box flexGrow={1}>
                <Typography variant="body1" color="textSecondary">
                  {physicalProduct.seasonsUID}
                </Typography>
              </Box>
            </Box>
            <Spacer mt={1} />

            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">Offload method</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={offloadMethod}
                onChange={e => {
                  setOffloadMethod(e.target.value as string)
                }}
                label="Offload method"
                fullWidth
              >
                {offloadMethods.map((method, index) => (
                  <MenuItem value={method.value} key={index}>
                    {method.display}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Spacer mt={2} />
            <TextField
              label="Notes"
              name="notes"
              type="text"
              variant="outlined"
              onChange={e => {
                setOffloadNotes(e.target.value as string)
              }}
              value={offloadNotes}
              rows={4}
              fullWidth
              multiline
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onSave} color="primary" variant="contained" disabled={!shouldAllowSave}>
            Offload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
