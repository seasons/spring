import { Container, Box, Grid } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useMutation } from "react-apollo"
import { useQueryWithStore, Loading } from "@seasons/react-admin"
import { useRefresh } from "@seasons/react-admin"
import { Header, Spacer, Snackbar, Text, Wizard } from "components"
import { SnackbarState } from "components/Snackbar"
import { SelectField, TextField } from "fields"
import { DateTime } from "luxon"
import { colors } from "theme/colors"
import { ApolloError } from "apollo-client"
import { Overview } from "./Components/Overview"
import { UPSERT_COLLECTION } from "./mutations"
import { useHistory } from "react-router-dom"
import { CollectionFormValues } from "./CreateCollectionsView"

export const CollectionsView: React.FC<{ match: any }> = ({ match }) => {
  const { id } = match.params
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
  const { data, loading, loaded, error } = useQueryWithStore({
    type: "getOne",
    resource: "Collection",
    payload: { id },
  })
  const [upsertCollection] = useMutation(UPSERT_COLLECTION, { onError: onMutationError })
  useEffect(() => {
    if (data.products) {
      setSelectedProducts(data.products)
    }
  }, [data])

  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })

  const onSubmit = async ({ images, title, subTitle, published, description }: CollectionFormValues) => {
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
