import { Container } from "@material-ui/core"
import React, { useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { useHistory } from "react-router-dom"
import { Snackbar, Spacer, Wizard } from "components"
import { SnackbarState } from "components/Snackbar"
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
  const onMutationError = (error: ApolloError) => {
    toggleSnackbar({
      show: true,
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

  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })

  const onSubmit = async values => {
    const numImages = 4
    const images = [...Array(numImages).keys()].map(index => values[`image_${index}`]).filter(Boolean)
    const { title, subTitle, published, description } = values
    console.log("images", images)
    setIsSubmitting(true)
    const result = await upsertCollection({
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
    const id = result?.data?.upsertCollection?.id
    if (id) {
      history.push(`/content/collections/${id}`)
    } else {
      toggleSnackbar({
        show: true,
        message: "Error saving your collection",
        status: "error",
      })
    }
  }

  const initialValues = {
    title: "",
    subTitle: "",
    description: "",
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
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </Container>
  )
}
