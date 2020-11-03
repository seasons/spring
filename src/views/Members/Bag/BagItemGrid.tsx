import React from "react"
import { Table, TableHead, TableCell, TableBody, TableRow, Card, Box, Typography } from "@material-ui/core"
import { Image } from "components/Image"

export const BagItemRow = props => {
  const { bagItem } = props
  const { product, sku } = bagItem.productVariant
  const { name, brand } = product
  const image = product.images?.[0]

  return (
    <TableRow>
      <TableCell>
        <Image url={image.url} size="medium" />
      </TableCell>
      <TableCell>
        <Typography color="secondary" style={{ letterSpacing: 1 }}>
          {sku}
        </Typography>
      </TableCell>
      <TableCell>{brand.name}</TableCell>
      <TableCell>{name}</TableCell>
    </TableRow>
  )
}

interface BagItemGridProps {
  bagItems: any
}

export const BagItemGrid: React.FC<BagItemGridProps> = props => {
  const { bagItems } = props
  return (
    <Box p={1} width="100%">
      <Card style={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableCell>Image</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Brand Name</TableCell>
            <TableCell>Product Name</TableCell>
          </TableHead>
          <TableBody>
            {bagItems.map(bagItem => (
              <BagItemRow bagItem={bagItem} />
            ))}
          </TableBody>
        </Table>
      </Card>
    </Box>
  )
}
