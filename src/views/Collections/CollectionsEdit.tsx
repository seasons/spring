import { Container } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { Spacer, Snackbar, Wizard } from "components"
import { SnackbarState } from "components/Snackbar"
import { ApolloError } from "apollo-client"
import { Overview } from "./Components/Overview"
import { UPSERT_COLLECTION } from "./mutations"
import { useParams } from "react-router-dom"
import { COLLECTION_PRODUCTS_QUERY } from "queries/Collection"
import { useQueryWithStore } from "@seasons/react-admin"

export const CollectionsEdit: React.FC<{ match: any }> = ({ match }) => {
  const { collectionID } = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedProductIDs, setSelectedProductIDs] = useState([] as any[])
  const onMutationError = (error: ApolloError) => {
    toggleSnackbar({
      show: true,
      message: error?.message,
      status: "error",
    })
  }

  const { data } = useQueryWithStore({
    type: "getOne",
    resource: "Collection",
    payload: { id: collectionID },
  })

  const { data: productsData, refetch } = useQuery(COLLECTION_PRODUCTS_QUERY, {
    variables: { productIDs: selectedProductIDs },
  })
  const products = productsData?.products
  const collection = data?.collection

  useEffect(() => {
    if (selectedProductIDs?.length > 0 && selectedProductIDs?.length !== products?.length) {
      refetch()
    }
  }, [selectedProductIDs, products, refetch])

  console.log("data", data)

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
    if (collection && selectedProductIDs.length === 0) {
      setSelectedProductIDs(collection.products.map(p => p.id))
    }
  }, [collection, selectedProductIDs])

  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })

  const onSubmit = async values => {
    const numImages = 4
    const images = [...Array(numImages).keys()].map(index => values[`image_${index}`]).filter(Boolean)
    const { title, subTitle, published, description } = values
    setIsSubmitting(true)
    await upsertCollection({
      variables: {
        data: {
          images,
          title,
          subTitle,
          published,
          productIDs: selectedProductIDs,
          descriptions: { set: [description] },
        },
      },
    })
  }

  let initialValues = {} as any

  if (collection) {
    initialValues = {
      images: collection.images,
      title: collection.title,
      subTitle: collection.subTitle,
      published: collection.published,
      description: collection.descriptions?.[0],
    }
    collection.images?.forEach((image, index) => {
      initialValues[`image_${index}`] = image.url
    })
  }

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
