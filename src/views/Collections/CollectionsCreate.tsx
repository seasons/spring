import { Container } from "@material-ui/core"
import React, { useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { useHistory } from "react-router-dom"
import { Spacer, Wizard } from "components"
import { useSnackbarContext } from "components/Snackbar"
import { ApolloError } from "apollo-client"
import { Overview } from "./Components/Overview"
import { UPSERT_COLLECTION } from "./mutations"
import { COLLECTION_PRODUCTS_QUERY } from "queries/Collection"

export type CollectionFormValues = {
  title: string
  subTitle?: string
  description: string
  images?: File[]
  published: boolean
  products?: any
}

export const CollectionsCreate: React.FC = () => {
  const history = useHistory()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedProductIDs, setSelectedProductIDs] = useState([] as string[])
  const { showSnackbar } = useSnackbarContext()
  const onMutationError = (error: ApolloError) => {
    showSnackbar({
      message: error?.message,
      status: "error",
    })
  }
  const [upsertCollection] = useMutation(UPSERT_COLLECTION, { onError: onMutationError })
  const { data, refetch } = useQuery(COLLECTION_PRODUCTS_QUERY, {
    variables: { productIDs: selectedProductIDs },
  })
  const products = data?.products

  React.useEffect(() => {
    if (selectedProductIDs?.length > 0 && selectedProductIDs?.length !== products?.length) {
      refetch()
    }
  }, [selectedProductIDs, products, refetch])

  const onSubmit = async values => {
    const numImages = 4
    const images = [...Array(numImages).keys()].map(index => values[`image_${index}`]).filter(Boolean)
    const { title, subTitle, published, description, placements, displayTextOverlay, textOverlayColor } = values
    setIsSubmitting(true)
    const result = await upsertCollection({
      variables: {
        data: {
          images,
          title,
          subTitle,
          published,
          displayTextOverlay,
          textOverlayColor,
          placements,
          productIDs: selectedProductIDs,
          descriptions: { set: [description] },
        },
      },
    })
    const id = result?.data?.upsertCollection?.id
    if (id) {
      history.push(`/content/collections/${id}`)
    } else {
      showSnackbar({
        message: "Error saving your collection",
        status: "error",
      })
    }
  }

  const initialValues = {
    title: "",
    subTitle: "",
    description: "",
    textOverlayColor: "",
    displayTextOverlay: false,
    published: false,
  }

  return (
    <Container maxWidth={false}>
      <Wizard onSubmit={onSubmit} submitting={isSubmitting} initialValues={initialValues} submitButtonTitle="Save">
        <Overview
          products={products}
          selectedProductIDs={selectedProductIDs}
          setSelectedProductIDs={setSelectedProductIDs}
          headerTitle="Create a new collection"
        />
      </Wizard>
      <Spacer mt={18} />
    </Container>
  )
}
