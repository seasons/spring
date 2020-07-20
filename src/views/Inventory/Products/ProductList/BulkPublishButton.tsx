import React, { useState } from "react"
import { Button } from "@material-ui/core"
import { useMutation } from "react-apollo"
import gql from "graphql-tag"

const PUBLISH_PRODUCTS = gql`
  mutation PublishProducts($productIDs: [String!]) {
    publishProducts(productIDs: $productIDs)
  }
`

export const BulkPublishButton = props => {
  const [isMutating, setIsMutating] = useState(false)
  const { toggleSnackbar } = props
  const [publishProducts] = useMutation(PUBLISH_PRODUCTS, {
    onCompleted: result => {
      console.log("result", result)
      toggleSnackbar({
        show: true,
        message: `Successfully updated status for physical product ${result}.`,
        status: "success",
      })
      setIsMutating(false)
    },
    onError: error => {
      toggleSnackbar({
        show: true,
        message: "There was an error publishing the products.",
        status: "error",
      })
      setIsMutating(false)
    },
  })

  const { selectedIds } = props
  const onClickButton = async () => {
    if (isMutating) {
      return
    }
    setIsMutating(true)
    await publishProducts({
      variables: {
        productIDs: selectedIds,
      },
    })
  }

  return (
    <Button color="primary" onClick={onClickButton} size="small" variant="contained">
      Publish
    </Button>
  )
}
