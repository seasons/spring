import React from "react"
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Card,
  Box,
  Menu,
  IconButton,
  MenuItem,
  styled,
} from "@material-ui/core"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"

import { CheckField } from "fields"
import { colors } from "theme"

export const PhysicalProductRow = ({ physicalProduct, setUpdatingPhysicalProduct }) => {
  const { seasonsUID, productStatus, inventoryStatus, variantID } = physicalProduct

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const menuItems = [
    {
      text: "Update status",
      action: () => setUpdatingPhysicalProduct(physicalProduct),
    },
  ]

  return (
    <TableRow>
      <TableCell>{seasonsUID}</TableCell>
      <TableCell>{productStatus}</TableCell>
      <TableCell>{inventoryStatus}</TableCell>
      <TableCell>
        <CheckField record={physicalProduct} source="barcoded" value={true} />
      </TableCell>
      <TableCell>{variantID}</TableCell>
      <TableCell>
        <Box>
          <BorderedIconButton onClick={handleClick} size="small">
            <MoreHorizIcon />
          </BorderedIconButton>
          <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            {menuItems.map((item, i) => (
              <MenuItem
                key={`menuitem-${item.text + i}`}
                onClick={() => {
                  handleClose()
                  item?.action?.()
                }}
              >
                {item.text}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </TableCell>
    </TableRow>
  )
}

const BorderedIconButton = styled(IconButton)({
  border: `1px solid ${colors.grey[300]}`,
  padding: "5px",
})

interface PhysicalProductsGridProps {
  physicalProducts: any[]
  setUpdatingPhysicalProduct: (physicalProduct: any) => void
}

export const PhysicalProductsGrid: React.FC<PhysicalProductsGridProps> = ({
  physicalProducts,
  setUpdatingPhysicalProduct,
}) => {
  return (
    <Box p={1} width="100%">
      <Card style={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableCell>Seasons UID</TableCell>
            <TableCell>Product status</TableCell>
            <TableCell>Inventory status</TableCell>
            <TableCell>Barcoded</TableCell>
            <TableCell>Product variant ID</TableCell>
            <TableCell>Actions</TableCell>
          </TableHead>
          <TableBody>
            {physicalProducts.map(product => (
              <PhysicalProductRow physicalProduct={product} setUpdatingPhysicalProduct={setUpdatingPhysicalProduct} />
            ))}
          </TableBody>
        </Table>
      </Card>
    </Box>
  )
}
