import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import clsx from "clsx"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardActions from "@material-ui/core/CardActions"
import Collapse from "@material-ui/core/Collapse"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import ColorIcon from "@material-ui/icons/Brightness1"
import { red } from "@material-ui/core/colors"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import { useHistory } from "react-router-dom"
import { Box, Table, TableBody, TableCell, TableRow, Chip, Divider } from "@material-ui/core"
import { Indicator } from "components/Indicator"
import { WarehouseLocationPopover } from "components/WarehouseLocationPopover"

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "125%",
    width: "100%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}))

export const ProductCard = props => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const router = useHistory()

  const { product: physicalProduct } = props
  const { product } = physicalProduct?.productVariant
  const { name, brand } = product
  const image = product.images?.[0]
  const color = product.color

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          title={name}
          subheader={brand.name}
          action={
            <IconButton
              aria-label="settings"
              onClick={() => {
                router.push(`/inventory/product/variant/physicalProduct/${physicalProduct.id}/manage`)
              }}
            >
              <NavigateNextIcon />
            </IconButton>
          }
        />
        <CardMedia className={classes.media} image={image.url} />
        <Divider />
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Product Status</TableCell>
              <TableCell align="right">
                <Chip
                  label={physicalProduct.productStatus}
                  icon={
                    <Box pl={1}>
                      <Indicator status={physicalProduct.productStatus} />
                    </Box>
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Location Type</TableCell>
              <TableCell align="right">
                <Chip label={physicalProduct?.warehouseLocation?.type || "Unknown"} color="secondary" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Location ID</TableCell>
              <TableCell align="right">
                <WarehouseLocationPopover
                  warehouseLocation={physicalProduct.warehouseLocation}
                ></WarehouseLocationPopover>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <CardActions disableSpacing>
          <Typography>{`Click to ${expanded ? "hide" : "view"} Details`}</Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider />
          <Table>
            <TableRow>
              <TableCell style={{ paddingRight: 0 }}>Barcode</TableCell>
              <TableCell align="right" style={{ paddingLeft: 0 }}>
                <Typography variant="body1" color="textSecondary">
                  {physicalProduct.barcode}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingRight: 0 }}>SUID</TableCell>
              <TableCell align="right" style={{ paddingLeft: 0 }}>
                <Typography variant="body1" color="textSecondary">
                  {physicalProduct.seasonsUID}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Reservation Count</TableCell>
              <TableCell align="right">
                <Typography variant="body1" color="textSecondary">
                  9
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Utilization Rate</TableCell>
              <TableCell align="right">
                <Typography variant="body1" color="textSecondary">
                  58%
                </Typography>
              </TableCell>
            </TableRow>
            {color && (
              <TableRow>
                <TableCell>Color</TableCell>
                <TableCell align="right">
                  <Chip icon={<ColorIcon style={{ color: color.hexCode }} />} label={color.name} variant="outlined" />
                </TableCell>
              </TableRow>
            )}
          </Table>
        </Collapse>
      </Card>
    </>
  )
}
