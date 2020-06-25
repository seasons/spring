import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { Form } from "react-final-form"

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
  Typography,
} from "@material-ui/core"
import { DialogTitle, Loader, Spacer } from "components"
import { SelectField, TextField } from "fields"
import { UPDATE_PHYSICAL_PRODUCT } from "../../mutations"
import { ProductEditQuery_product_variants_physicalProducts } from "generated/ProductEditQuery"

interface OffloadPhysicalProductModalProps {
  open: boolean
  physicalProduct: ProductEditQuery_product_variants_physicalProducts
  onClose?: () => void
  onSave?: () => void
}

export const OffloadPhysicalProductModal: React.FC<OffloadPhysicalProductModalProps> = ({
  open,
  onClose,
  onSave,
  physicalProduct,
}) => {
  const [isMutating, setIsMutating] = useState(false)
  const [updatePhysicalProduct] = useMutation(UPDATE_PHYSICAL_PRODUCT)

  if (!physicalProduct) {
    return null
  }

  const onSubmit = async values => {
    const { offloadMethod, offloadNotes } = values
    setIsMutating(true)
    const result = await updatePhysicalProduct({
      variables: {
        where: { id: physicalProduct.id },
        data: {
          inventoryStatus: "Offloaded",
          offloadMethod,
          offloadNotes,
        },
      },
    })
    setIsMutating(false)
    if (result?.data) {
      onSave?.()
    }
  }

  const offloadMethods = [
    { value: "SoldToUser", display: "Sold to user" },
    { value: "SoldToThirdParty", display: "Sold to third party" },
    { value: "ReturnedToVendor", display: "Returned to vendor" },
    { value: "Recycled", display: "Recycled" },
    { value: "Unknown", display: "Unknown" },
  ]

  const initialValues = {
    offloadMethod: physicalProduct?.offloadMethod,
    offloadNotes: physicalProduct?.offloadNotes,
  }

  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
        Offload physical product
      </DialogTitle>
      <Form initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
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
                  <SelectField name="offloadMethod" choices={offloadMethods} requiredString />
                  <Spacer mt={2} />
                  <TextField multiline name="offloadNotes" placeholder="Enter notes" />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button autoFocus color="primary" variant="contained" type="submit">
                  {isMutating ? <Loader size={20} /> : "Offload"}
                </Button>
              </DialogActions>
            </form>
          )
        }}
      </Form>
    </Dialog>
  )
}
