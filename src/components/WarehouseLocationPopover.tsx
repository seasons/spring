import React from "react"
import { Typography, Popover, Chip, Box } from "@material-ui/core"

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

  if (!warehouseLocation) {
    return (
      <Typography color="secondary" style={{ letterSpacing: 1 }}>
        Unknown
      </Typography>
    )
  }

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
        <Box display="flex">
          <Box width="50%">Location Type</Box>
          <Box>
            <Chip label={type} color="secondary" />
          </Box>
        </Box>
        <Box display="flex">
          <Box width="50%">Location Code</Box>
          <Box>
            <Typography color="secondary" style={{ letterSpacing: 1 }}>
              {locationCode}
            </Typography>
          </Box>
        </Box>
        <Box display="flex">
          <Box width="50%">Location Code</Box>
          <Box>
            <Typography color="secondary" style={{ letterSpacing: 1 }}>
              {itemCode}
            </Typography>
          </Box>
        </Box>
      </Popover>
    </div>
  )
}
