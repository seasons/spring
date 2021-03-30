import React from "react"
import { Box, Button, Dialog, DialogContent, DialogActions } from "@material-ui/core"
import { DialogTitle, Spacer, Text, Loader } from "components"
import { SelectField } from "fields"
import { Form } from "react-final-form"

interface UpdatePhysicalProductStatusModalProps {
  open: boolean
  onClose?: () => void
  onSubmit: (values) => void
  physicalProduct?: any
  isMutating: boolean
}

export const UpdatePhysicalProductStatusModal: React.FC<UpdatePhysicalProductStatusModalProps> = ({
  open,
  onSubmit,
  onClose,
  physicalProduct,
  isMutating = false,
}) => {
  if (!physicalProduct) {
    return null
  }

  const productStatusChoices = ["New", "Used", "Dirty", "Damaged", "PermanentlyDamaged", "Clean", "Lost"].map(
    choice => ({
      display: choice,
      value: choice,
    })
  )
  const inventoryStatusChoices = ["NonReservable", "Reservable", "Reserved", "Stored", "Offloaded"].map(choice => ({
    display: choice,
    value: choice,
    // 1. Must go through Offload action in order to set status to Offloaded
    // 2. Can only store a physicalProduct by storing its parent product.
    disabled: ["Offloaded", "Stored"].includes(choice),
  }))

  const initialValues = {
    physicalProductStatus: physicalProduct.productStatus,
    inventoryStatus: physicalProduct.inventoryStatus,
  }

  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
        Update Physical Product Status
      </DialogTitle>
      <Form initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <DialogContent dividers>
                <Box my={2} width={["300px"]}>
                  <Text variant="h6">Physical product status *</Text>
                  <Spacer mt={1} />
                  <SelectField name="physicalProductStatus" choices={productStatusChoices} requiredString />
                  <Spacer mt={2} />
                  <Text variant="h6">Inventory status *</Text>
                  <Spacer mt={1} />
                  <SelectField name="inventoryStatus" choices={inventoryStatusChoices} requiredString />
                </Box>
              </DialogContent>
              <DialogActions>
                <Box mr={1} my={1}>
                  <Button autoFocus type="submit" color="primary" variant="contained">
                    {isMutating ? <Loader size={20} /> : "Save"}
                  </Button>
                </Box>
              </DialogActions>
            </form>
          )
        }}
      </Form>
    </Dialog>
  )
}
