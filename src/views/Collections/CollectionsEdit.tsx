import { Container } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { Spacer, Snackbar, Wizard } from "components"
import { SnackbarState } from "components/Snackbar"
import { ApolloError } from "apollo-client"
import { Overview } from "./Components/Overview"
import { UPSERT_COLLECTION } from "./mutations"
import { COLLECTION_EDIT_QUERY } from "queries/Collection"

export const CollectionsEdit: React.FC<{ match: any }> = ({ match }) => {
  const { id } = match.params
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([] as any[])
  const onMutationError = (error: ApolloError) => {
    toggleSnackbar({
      show: true,
      message: error?.message,
      status: "error",
    })
  }
  const { data, refetch } = useQuery(COLLECTION_EDIT_QUERY, {
    variables: { input: { id } },
  })
  const [upsertCollection] = useMutation(UPSERT_COLLECTION, { onError: onMutationError })
  const collection = data?.collection
  useEffect(() => {
    if (collection) {
      setSelectedProducts(collection.products)
    }
  }, [collection])

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
    const result = await upsertCollection({
      variables: {
        data: {
          images,
          title,
          subTitle,
          published,
          productIDs: selectedProducts?.map(p => p.id),
          descriptions: { set: [description] },
        },
      },
    })
    const id = result?.data?.id
    if (id) {
      refetch()
    }
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
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          headerTitle="Edit a collection"
        />
      </Wizard>
      <Spacer mt={18} />
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </Container>
  )
}
