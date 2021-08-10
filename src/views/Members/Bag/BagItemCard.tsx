import React, { useState } from "react"
import { useRefresh } from "@seasons/react-admin"
import { makeStyles, styled } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import IconButton from "@material-ui/core/IconButton"
import { ConfirmationDialog } from "components/ConfirmationDialog"
import { red } from "@material-ui/core/colors"
import DeleteIcon from "@material-ui/icons/Delete"
import ArchiveIcon from "@material-ui/icons/Archive"
import { useMutation } from "react-apollo"
import { gql } from "apollo-boost"
import { Box, Typography } from "@material-ui/core"

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
  mutation DeleteBagItem($itemID: ID!, $type: DeleteBagItemType) {
    deleteBagItem(itemID: $itemID, type: $type)
  }
`

export const BagItemCard = props => {
  const classes = useStyles()
  const refresh = useRefresh()
  const [isDeleteConfirmationDialogOpen, setIsDeleteConfirmationDialogOpen] = useState(false)
  const [isReturnConfirmationDialogOpen, setIsReturnConfirmationDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteBagItem] = useMutation(REMOVE_FROM_BAG, {
    onCompleted: () => {
      refresh()
      setIsDeleteConfirmationDialogOpen(false)
    },
    onError: () => {
      refresh()
      setIsDeleteConfirmationDialogOpen(false)
    },
  })

  const { bagItem } = props
  const { product } = bagItem.productVariant
  const { name, brand } = product
  const image = product.images?.[0]

  const onCloseConfirmationDialog = async (agreed: boolean, type: "Return" | "Delete") => {
    // Make sure user has confirmed submission
    if (!agreed || isSubmitting) {
      return
    }
    // Show loading spinner, submit, and then stop loading spinner
    setIsSubmitting(true)
    await deleteBagItem({
      variables: {
        itemID: bagItem.id,
        type,
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
              aria-label="return"
              onClick={() => {
                setIsReturnConfirmationDialogOpen(true)
              }}
            >
              <ArchiveIcon />
            </IconButton>
          }
        />
        <CardMedia className={classes.media} image={image.url} />
        <Box padding="0px 16px">
          <FlexBox>
            <Typography>{bagItem?.status}</Typography>
            <IconButton
              aria-label="delete"
              onClick={() => {
                setIsDeleteConfirmationDialogOpen(true)
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </FlexBox>
        </Box>
      </Card>

      <ConfirmationDialog
        title="Return Item"
        body="Are you sure you want to mark this item as returned?"
        open={isReturnConfirmationDialogOpen}
        setOpen={setIsReturnConfirmationDialogOpen}
        onClose={agreed => onCloseConfirmationDialog(agreed, "Return")}
      />

      <ConfirmationDialog
        title="Delete Item"
        body="Warning: Are you sure you want to delete this bag item? This will also remove the item from it's reservation. You should return the item instead of deleting if this item was fully rented by a customer."
        open={isDeleteConfirmationDialogOpen}
        setOpen={setIsDeleteConfirmationDialogOpen}
        onClose={agreed => onCloseConfirmationDialog(agreed, "Delete")}
      />
    </>
  )
}

const FlexBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "center",
})
