import React, { useState, useEffect } from "react"
import { downloadCSV } from "@seasons/react-admin"
import jsonExport from "jsonexport/dist"
import { useQuery, useMutation } from "react-apollo"
import { BarcodeProducts } from "../queries/BarcodeProducts"
import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Snackbar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core"
import { DialogTitle } from "components"
import { Alert, Color } from "@material-ui/lab"
import { filter, values } from "lodash"
import { UPDATE_PHYSICAL_PRODUCTS } from "views/Inventory/PhysicalProducts/mutations"

interface ProcessReturnModalProps {
  open: boolean
  onClose?: () => void
  onSave?(values: BarcodeStates): void
  disableButton?: boolean
}

type BarcodeStates = { [key: string]: ProductState }
interface ProductState {
  seasonsUID: string
  barcode: string
  barcoded: boolean
}

export const PrintBarcodesModal: React.FC<ProcessReturnModalProps> = ({ disableButton, open, onSave, onClose }) => {
  const barcodeMaps = {}
  const { data: barcodeProducts, loading, refetch } = useQuery(BarcodeProducts)
  barcodeProducts?.physicalProducts.forEach(product => {
    barcodeMaps[product.barcode] = {
      seasonsUID: product.seasonsUID,
      barcode: product.barcode,
      barcoded: false,
    }
  })
  const [updateManyPhysicalProducts] = useMutation(UPDATE_PHYSICAL_PRODUCTS, {
    onCompleted: () => {
      toggleSnackbar({
        show: true,
        message: "Physical products updated",
        status: "success",
      })
    },
    onError: error => {
      toggleSnackbar({
        show: true,
        message: error?.message,
        status: "error",
      })
    },
  })

  useEffect(() => {
    refetch()
  }, [open])

  const [snackbar, toggleSnackbar] = useState<{ show: boolean; message: string; status: Color }>({
    show: false,
    message: "",
    status: "success",
  })
  const [checkAll, setCheckAll] = useState(false)
  const [barcodeStates, setBarcodeStates] = useState<BarcodeStates>({
    ...barcodeMaps,
  })
  const [downloaded, setDownloaded] = useState(false)

  if (loading || !barcodeProducts) {
    return null
  }

  const shouldAllowDownload = filter(values(barcodeStates), a => a.barcoded).length > 0

  const handleDownload = () => {
    const barcodes = Object.values(barcodeStates)
      .filter(a => a.barcoded)
      .map(b => ({ id: b.seasonsUID, barcode: b.barcode }))
    jsonExport(
      barcodes,
      {
        headers: ["id", "barcode"],
      },
      (err, csv) => {
        downloadCSV(csv, "barcodes")
      }
    )

    setDownloaded(true)
  }

  const handleSave = async () => {
    const ids = Object.values(barcodeStates)
      .filter(a => a.barcoded)
      .map(b => b.seasonsUID)

    await updateManyPhysicalProducts({
      variables: {
        where: {
          seasonsUID_in: ids,
        },
      },
    })
    onSave?.(barcodeProducts)
  }

  const hideSnackbar = () => {
    toggleSnackbar({
      show: false,
      message: "",
      status: "success",
    })
  }

  const handleCheckAll = e => {
    let updatedBarcodeStates = {
      ...barcodeMaps,
    }
    barcodeProducts?.physicalProducts.forEach(product => {
      updatedBarcodeStates[product.barcode] = {
        ...product,
        barcoded: e.target.checked,
      }
    })
    setBarcodeStates(updatedBarcodeStates)
    setCheckAll(e.target.checked)
  }

  const handleBarcodeChange = e => {
    const input = e.target.value
    const productState = barcodeMaps[input]

    setBarcodeStates({
      ...barcodeStates,
      [input]: {
        ...productState,
        barcoded: e.target.checked,
      },
    })
  }

  return (
    <>
      <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
          <Box display="flex" alignItems="center" mt="-3px" height="30px">
            <Box flex={1}>Print Barcodes</Box>
            <Box mr={4}>
              <FormControlLabel control={<Checkbox checked={checkAll} onChange={handleCheckAll} />} label="Check All" />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box mt={1} mb={2}>
            <Card>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Seasons UID</TableCell>
                    <TableCell align="right">Barcode</TableCell>
                    <TableCell align="right">Print</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(barcodeMaps).map((row: any) => {
                    const state = barcodeStates[row.barcode] || barcodeMaps[row.barcode]
                    return (
                      <TableRow key={row.seasonsUID}>
                        <TableCell component="th" scope="row">
                          {row.seasonsUID}
                        </TableCell>
                        <TableCell align="right">{row.barcode}</TableCell>
                        <TableCell align="right">
                          <Checkbox
                            value={row.barcode}
                            checked={state?.barcoded}
                            onChange={handleBarcodeChange}
                            inputProps={{ "aria-label": "primary checkbox" }}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Card>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleDownload}
            color="secondary"
            variant="contained"
            disabled={!shouldAllowDownload || disableButton}
          >
            Download CSV
          </Button>
          <Button
            autoFocus
            onClick={handleSave}
            color="primary"
            variant="contained"
            disabled={!shouldAllowDownload || disableButton || !downloaded}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.show}
        autoHideDuration={6000}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={hideSnackbar} severity={snackbar.status}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
