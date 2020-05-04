import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import clsx from "clsx"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Collapse from "@material-ui/core/Collapse"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import ColorIcon from "@material-ui/icons/Brightness1"
import { red } from "@material-ui/core/colors"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { Table, TableCell, TableRow, Chip, Divider } from "@material-ui/core"

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
  const [expanded, setExpanded] = React.useState(false)

  const { product: physicalProduct } = props
  const { product } = physicalProduct?.productVariant
  const { name, brand } = product
  const image = product.resizedImages?.[0]
  const color = product.color

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={brand.name}
      />
      <CardMedia className={classes.media} image={image.url} title="Paella dish" />
      <Divider />
      <Table>
        <TableRow>
          <TableCell>Inventory Status</TableCell>
          <TableCell align="right">
            <Chip label={physicalProduct.inventoryStatus} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Location Type</TableCell>
          <TableCell align="right">
            <Chip label="Slick Rail" color="secondary" />
          </TableCell>
        </TableRow>
      </Table>
      <CardActions disableSpacing>
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
            <TableCell>SUID</TableCell>
            <TableCell align="right">
              <Typography variant="body1" color="textSecondary">
                {physicalProduct.seasonsUID}
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
  )
}
