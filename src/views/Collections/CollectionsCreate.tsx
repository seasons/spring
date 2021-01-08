import { Container } from "@material-ui/core"
import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { useHistory } from "react-router-dom"
import { Snackbar, Spacer, Wizard } from "components"
import { SnackbarState } from "components/Snackbar"
import { ApolloError } from "apollo-client"
import { Overview } from "./Components/Overview"
import { UPSERT_COLLECTION } from "./mutations"

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
  const [selectedProducts, setSelectedProducts] = useState([] as any[])
  const onMutationError = (error: ApolloError) => {
    toggleSnackbar({
      show: true,
      message: error?.message,
      status: "error",
    })
  }
  const [upsertCollection] = useMutation(UPSERT_COLLECTION, { onError: onMutationError })

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
    console.log("result", result)
    const id = result?.data?.id
    if (id) {
      history.push(`/content/collection/${id}`)
    }
  }

  return (
    <Container maxWidth={false}>
      <Wizard onSubmit={onSubmit} submitting={isSubmitting} submitButtonTitle="Save">
        <Overview selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
      </Wizard>
      <Spacer mt={18} />
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </Container>
  )
}
