import React from "react"
import { Table, TableHead, TableCell, TableBody, TableRow, Card, Box, Typography, Checkbox } from "@material-ui/core"
import { Indicator } from "components/Indicator"
import { Image } from "components/Image"

export const OrderLineItemRow = ({ lineItem }) => {
  const { productVariant, recordType, status, taxPrice, price, needShipping } = lineItem

  let name = ""
  let image = { url: "" }
  switch (recordType) {
    case "PhysicalProduct":
      const product = productVariant.product
      name = product?.name
      image = product?.images?.[0]
      break
    case "Package":
      name = "Shipping"
      break
  }

  const formatPrice = price =>
    (price || 0).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })

  return (
    <TableRow>
      <TableCell>{!!image.url && <Image url={image.url} size="medium" />}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>
        <Indicator status={status} />
        <Box ml={1} style={{ display: "inline-block" }}>
          {status}
        </Box>
      </TableCell>
      <TableCell>
        <Checkbox checked={needShipping} />
      </TableCell>
      <TableCell>{formatPrice(taxPrice)}</TableCell>
      <TableCell>{formatPrice(price)}</TableCell>
    </TableRow>
  )
}

interface ProductGridProps {
  lineItems: any[]
}

export const OrderLineItemGrid: React.FC<ProductGridProps> = props => {
  const { lineItems } = props

  return (
    <Box p={1} width="100%">
      <Card style={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Needs Shipping</TableCell>
            <TableCell>Tax</TableCell>
            <TableCell>Price</TableCell>
          </TableHead>
          <TableBody>
            {lineItems.map(lineItem => (
              <OrderLineItemRow lineItem={lineItem} />
            ))}
          </TableBody>
        </Table>
      </Card>
    </Box>
  )
}
