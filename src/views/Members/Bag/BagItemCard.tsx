import React, { useState } from "react"
import { useRefresh } from "@seasons/react-admin"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import IconButton from "@material-ui/core/IconButton"
import { ConfirmationDialog } from "components/ConfirmationDialog"
import { red } from "@material-ui/core/colors"
import DeleteIcon from "@material-ui/icons/Delete"
import { useMutation } from "react-apollo"
import { gql } from "apollo-boost"

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

export const REMOVE_FROM_BAG = gql`
  mutation DeleteBagItem($itemID: ID!) {
    deleteBagItem(itemID: $itemID)
  }
`

export const BagItemCard = props => {
  const classes = useStyles()
  const refresh = useRefresh()
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteBagItem] = useMutation(REMOVE_FROM_BAG, {
    onCompleted: () => {
      refresh()
      setIsConfirmationDialogOpen(false)
    },
    onError: () => {
      refresh()
      setIsConfirmationDialogOpen(false)
    },
  })

  const { bagItem } = props
  const { product } = bagItem.productVariant
  const { name, brand } = product
  const image = product.images?.[0]

  const onCloseConfirmationDialog = async (agreed: boolean) => {
    // Make sure user has confirmed submission
    if (!agreed || isSubmitting) {
      return
    }
    // Show loading spinner, submit, and then stop loading spinner
    setIsSubmitting(true)
    await deleteBagItem({
      variables: {
        itemID: bagItem.id,
      },
    })
    setIsSubmitting(false)
  }

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          title={name}
          subheader={brand.name}
          action={
            <IconButton
              aria-label="remove"
              onClick={() => {
                setIsConfirmationDialogOpen(true)
              }}
            >
              <DeleteIcon />
            </IconButton>
          }
        />
        <CardMedia className={classes.media} image={image.url} />
      </Card>

      <ConfirmationDialog
        title="Remove Item"
        body="Are you sure you want to remove this bag item?"
        open={isConfirmationDialogOpen}
        setOpen={setIsConfirmationDialogOpen}
        onClose={onCloseConfirmationDialog}
      />
    </>
  )
}
