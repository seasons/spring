import React from "react"
import { Typography, Popover, Table, TableRow, TableCell, Chip } from "@material-ui/core"

export const WarehouseLocationPopover = props => {
  const { warehouseLocation } = props
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const { barcode, type, locationCode, itemCode } = warehouseLocation

  return (
    <div>
      <Typography
        color="secondary"
        style={{ letterSpacing: 1 }}
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {barcode}
      </Typography>
      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Table>
          <TableRow>
            <TableCell>Location Type</TableCell>
            <TableCell align="right">
              <Chip label={type} color="secondary" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Location Code</TableCell>
            <TableCell align="right">
              <Typography color="secondary" style={{ letterSpacing: 1 }}>
                {locationCode}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Item Code</TableCell>
            <TableCell align="right">
              <Typography color="secondary" style={{ letterSpacing: 1 }}>
                {itemCode}
              </Typography>
            </TableCell>
          </TableRow>
        </Table>
      </Popover>
    </div>
  )
}
