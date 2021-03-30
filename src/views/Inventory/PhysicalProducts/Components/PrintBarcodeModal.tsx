import { ConfirmationDialog } from "components"
import React from "react"
import { useMutation } from "react-apollo"
import { UPDATE_PHYSICAL_PRODUCT } from "../mutations"
import jsonExport from "jsonexport/dist"
import { downloadCSV } from "@seasons/react-admin"
import { useSnackbarContext } from "components/Snackbar"

interface PrintBarcodeModalProps {
  physicalProduct: any
  open: boolean
  setOpen: (boolean) => void
}

export const PrintBarcodeModal: React.FC<PrintBarcodeModalProps> = ({ physicalProduct, open, setOpen }) => {
  const { id: physicalProductID, barcoded, barcode, seasonsUID } = physicalProduct
  const { showSnackbar } = useSnackbarContext()
  const [updatePhysicalProduct] = useMutation(UPDATE_PHYSICAL_PRODUCT, {
    onError: error =>
      showSnackbar?.({
        message: error?.message,
        status: "error",
      }),
    onCompleted: data =>
      showSnackbar?.({
        message: "Barcode exported!",
        status: "success",
      }),
  })

  const onClose = async (agreed: boolean) => {
    if (agreed) {
      jsonExport(
        [{ id: seasonsUID, barcode }],
        {
          headers: ["id", "barcode"],
        },
        (err, csv) => {
          downloadCSV(csv, `${seasonsUID}-barcode`)
        }
      )
      if (!barcoded) {
        await updatePhysicalProduct({
          variables: {
            where: { id: physicalProductID },
            data: { barcoded: true },
          },
        })
      }
    }
  }

  const extraBodyText = barcoded ? `It has already been barcoded before.` : `This will mark it as barcoded`
  return (
    <ConfirmationDialog
      title={"Print Barcode"}
      body={`Are you sure you want to print the barcode for this physical product? ${extraBodyText}`}
      open={open}
      setOpen={setOpen}
      onClose={onClose}
    />
  )
}
