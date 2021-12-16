import {
  Button,
  CardActions,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableCell,
  TableHead,
  TableBody,
  Typography,
  TableRow,
} from "@material-ui/core"
import { Spacer } from "components"
import moment from "moment"
import React from "react"
import { formatPrice } from "utils/price"

interface LineItemModalProps {
  open: boolean
  onClose?: () => void
  mode: string | null
  lineItems: any
}

export const LineItemModal: React.FC<LineItemModalProps> = ({ open, onClose, mode, lineItems }) => {
  const productLineItems = lineItems?.filter(a => a.type === "PhysicalProduct")
  const packageLineItems = lineItems?.filter(a => a.type === "Package")
  const processingLineItems = lineItems?.filter(a => a.type === "Processing")

  const packageAndProcessingLineItemTable = lineItems => {
    return (
      <Table>
        <TableHead>
          <TableCell>Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Comments</TableCell>
        </TableHead>
        <TableBody>
          {lineItems?.map((a, id) => {
            return (
              <TableRow key={id}>
                <TableCell>{a.name}</TableCell>
                <TableCell>{formatPrice(a.price)}</TableCell>
                <TableCell>{a.comment}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  }

  return (
    <>
      <Dialog onClose={onClose} open={open} maxWidth={"xl"}>
        <DialogTitle>
          <Typography variant={"h3"}>{mode} line items</Typography>
        </DialogTitle>

        <DialogContent dividers>
          {productLineItems?.length > 0 && (
            <>
              <Typography variant={"h4"}>Products</Typography>
              <Spacer mb={1} />
              <Table>
                <TableHead>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Rental start at</TableCell>
                  <TableCell>Days rented</TableCell>
                  <TableCell>Rental ended at</TableCell>
                </TableHead>
                <TableBody>
                  {productLineItems?.map((a, id) => {
                    return (
                      <TableRow key={id}>
                        <TableCell>{a?.name || a?.physicalProduct?.productVariant?.product?.name}</TableCell>
                        <TableCell>{formatPrice(a.price)}</TableCell>
                        <TableCell>{moment(a?.rentalStartedAt).format("LLL")}</TableCell>
                        <TableCell>{a.daysRented}</TableCell>
                        <TableCell>{moment(a?.rentalEndedAt).format("LLL")}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </>
          )}
          <Spacer mb={5} />
          {packageLineItems?.length > 0 ? (
            <>
              <Typography variant={"h4"}>Packages</Typography>
              <Spacer mb={1} />
              {packageAndProcessingLineItemTable(packageLineItems)}
            </>
          ) : (
            <Typography variant={"h5"}> No package line items for this invoice</Typography>
          )}
          <Spacer mb={5} />
          {processingLineItems?.length > 0 ? (
            <>
              <Typography variant={"h4"}>Processing</Typography>
              <Spacer mb={1} />
              {packageAndProcessingLineItemTable(processingLineItems)}
            </>
          ) : (
            <Typography variant={"h5"}> No processing line items for this invoice</Typography>
          )}
        </DialogContent>
        <CardActions>
          <Button onClick={onClose}>Close</Button>
        </CardActions>
      </Dialog>
    </>
  )
}
