import React, { useState } from "react"
import { Button } from "@material-ui/core"
import { useMutation } from "react-apollo"
import gql from "graphql-tag"
import { useRefresh } from "@seasons/react-admin"
import { useSnackbarContext } from "components/Snackbar"

const PUBLISH_PRODUCTS = gql`
  mutation PublishProducts($productIDs: [ID!]) {
    publishProducts(productIDs: $productIDs) {
      message
      validatedIDs
      unvalidatedIDs
      status
    }
  }
`

export const BulkPublishButton = props => {
  const refresh = useRefresh()
  const [isMutating, setIsMutating] = useState(false)
  const { showSnackbar } = useSnackbarContext()

  const [publishProducts] = useMutation(PUBLISH_PRODUCTS, {
    onCompleted: result => {
      showSnackbar({
        message: result?.publishProducts?.message,
        status: result?.publishProducts?.status,
      })
      setIsMutating(false)
      refresh()
    },
    onError: error => {
      showSnackbar({
        message: `There was an error publishing the products. ${error?.graphQLErrors?.[0]?.message}`,
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
    <Button color="primary" onClick={onClickButton} size="small" variant="text">
      Publish
    </Button>
  )
}
