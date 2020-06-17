import React from "react"
import { Table, TableHead, TableCell, TableBody, TableRow, Card, Box, Typography } from "@material-ui/core"
import { GetReservation_products } from "generated/GetReservation"
import { Indicator } from "components/Indicator"
import { Image } from "components/Image"

export const ProductRow = props => {
  const { product: physicalProduct } = props
  const { product } = physicalProduct?.productVariant
  const image = product.images?.[0]
  const { seasonsUID } = physicalProduct

  const { barcode = "Unknown", type = "Unknown", locationCode = "Unknown", itemCode = "Unknown" } =
    physicalProduct.warehouseLocation || {}

  return (
    <TableRow>
      <TableCell>
        <Image url={image.url} size="medium" />
      </TableCell>
      <TableCell>
        <Typography color="secondary" style={{ letterSpacing: 1 }}>
          {barcode}
        </Typography>
      </TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>{locationCode}</TableCell>
      <TableCell>{itemCode}</TableCell>
      <TableCell>78.5%</TableCell>
      <TableCell>
        <Indicator status={physicalProduct.productStatus} />
        <Box ml={1} style={{ display: "inline-block" }}>
          {physicalProduct.productStatus}
        </Box>
      </TableCell>
      <TableCell>
        <Indicator status={physicalProduct.inventoryStatus} />
        <Box ml={1} style={{ display: "inline-block" }}>
          {physicalProduct.inventoryStatus}
        </Box>
      </TableCell>
      <TableCell>
        <Typography color="secondary" style={{ letterSpacing: 1 }}>
          {seasonsUID}
        </Typography>
      </TableCell>
    </TableRow>
  )
}

interface ProductGridProps {
  products: GetReservation_products[]
}

export const ProductGrid: React.FC<ProductGridProps> = props => {
  const { products } = props
  return (
    <Box p={1} width="100%">
      <Card style={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableCell>Image</TableCell>
            <TableCell>Location ID</TableCell>
            <TableCell>Location Type</TableCell>
            <TableCell>Location Code</TableCell>
            <TableCell>Item Code</TableCell>
            <TableCell>Utilization Rate</TableCell>
            <TableCell>Product Status</TableCell>
            <TableCell>Inventory Status</TableCell>
            <TableCell>Barcode</TableCell>
          </TableHead>
          <TableBody>
            {products.map(product => (
              <ProductRow product={product} />
            ))}
          </TableBody>
        </Table>
      </Card>
    </Box>
  )
}
