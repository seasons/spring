import { Box, Container } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { Spacer, Snackbar, Wizard } from "components"
import { SnackbarState } from "components/Snackbar"
import { useRefresh } from "@seasons/react-admin"
import { Overview } from "./Components/Overview"
import { UPSERT_COLLECTION } from "./mutations"
import { useParams } from "react-router-dom"
import { COLLECTION_PRODUCTS_QUERY } from "queries/Collection"
import { useQueryWithStore, Loading } from "@seasons/react-admin"

export const CollectionsEdit: React.FC<{ match: any }> = ({ match }) => {
  const { collectionID } = useParams()
  const refresh = useRefresh()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedProductIDs, setSelectedProductIDs] = useState([] as any[])
  const { data, loading, loaded, error } = useQueryWithStore({
    type: "getOne",
    resource: "Collection",
    payload: { id: collectionID },
  })

  const { data: productsData, refetch } = useQuery(COLLECTION_PRODUCTS_QUERY, {
    variables: { productIDs: selectedProductIDs },
  })
  const products = productsData?.products

  useEffect(() => {
    if (selectedProductIDs?.length > 0 && selectedProductIDs?.length !== products?.length) {
      refetch()
    }
  }, [selectedProductIDs, products, refetch])

  const [upsertCollection] = useMutation(UPSERT_COLLECTION, {
    refetchQueries: [
      {
        query: COLLECTION_PRODUCTS_QUERY,
        variables: { productIDs: selectedProductIDs },
      },
    ],
    onCompleted: result => {
      toggleSnackbar({
        show: true,
        message: "Collection updated",
        status: "success",
      })
    },
    onError: error => {
      toggleSnackbar({
        show: true,
        message: error?.message,
        status: "error",
      })
    },
  })

  useEffect(() => {
    if (data?.products?.length && selectedProductIDs.length === 0) {
      setSelectedProductIDs(data.products.map(p => p.id))
    }
  }, [data, selectedProductIDs])

  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })

  const onSubmit = async values => {
    const numImages = 4
    const images = [...Array(numImages).keys()].map(index => values[`image_${index}`]).filter(Boolean)
    const { title, subTitle, published, description, placements, displayTextOverlay, textOverlayColor } = values
    setIsSubmitting(true)
    await upsertCollection({
      variables: {
        data: {
          id: collectionID,
          images,
          displayTextOverlay,
          textOverlayColor,
          title,
          subTitle,
          published,
          productIDs: selectedProductIDs,
          descriptions: { set: [description] },
          placements,
        },
      },
    })
    refresh()
  }

  let initialValues = {} as any

  if (data) {
    initialValues = {
      images: data.images,
      title: data.title,
      subTitle: data.subTitle,
      published: data.published,
      description: data.descriptions?.[0],
      placements: data.placements,
      displayTextOverlay: data.displayTextOverlay,
      textOverlayColor: data.textOverlayColor,
    }
    data.images?.forEach((image, index) => {
      initialValues[`image_${index}`] = image.url
    })
  }

  if (!loaded && loading) return <Loading />
  if (error || !data) return <Box>{error.message}</Box>

  return (
    <Container maxWidth={false}>
      <Wizard onSubmit={onSubmit} submitting={isSubmitting} submitButtonTitle="Save" initialValues={initialValues}>
        <Overview
          selectedProductIDs={selectedProductIDs}
          setSelectedProductIDs={setSelectedProductIDs}
          products={products}
          headerTitle="Edit a collection"
        />
      </Wizard>
      <Spacer mt={18} />
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </Container>
  )
}
