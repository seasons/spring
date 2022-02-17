import { ConfirmationDialog } from "components"
import React from "react"
import { useMutation } from "react-apollo"
import { UNDO_OFFLOAD } from "../mutations"
import { useSnackbarContext } from "components/Snackbar"

interface UndoOffloadModalProps {
  physicalProduct: any
  open: boolean
  setOpen: (boolean) => void
}

export const UndoOffloadModal: React.FC<UndoOffloadModalProps> = ({ physicalProduct, open, setOpen }) => {
  const { id: physicalProductID } = physicalProduct
  const { showSnackbar } = useSnackbarContext()
  const [undoOffload] = useMutation(UNDO_OFFLOAD, {
    onError: error =>
      showSnackbar({
        message: error?.message,
        status: "error",
      }),
    onCompleted: data =>
      showSnackbar({
        message: "Offload undone!",
        status: "success",
      }),
  })

  const onClose = async (agreed: boolean) => {
    if (agreed) {
      await undoOffload({
        variables: {
          where: { id: physicalProductID },
        },
      })
    }
  }

  return (
    <ConfirmationDialog
      title={"Undo Offload"}
      body={`Are you sure you want to undo the offload for this item? This will set the status to Reservable or NonReservable (depending on whether or not it has a warehouse location), and update the counts`}
      open={open}
      setOpen={setOpen}
      onClose={onClose}
    />
  )
}
