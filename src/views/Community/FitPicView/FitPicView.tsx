import { Container, Box, Grid } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { useQueryWithStore, Loading } from "@seasons/react-admin"
import { useRefresh } from "@seasons/react-admin"
import { Header, Spacer, Text, Wizard } from "components"
import { fitPic } from "generated/fitPic"
import { SelectField, TextField } from "fields"
import { DateTime } from "luxon"
import { UPDATE_FIT_PIC, DELETE_FIT_PIC } from "../mutations"
import { colors } from "theme/colors"
import { ApolloError } from "apollo-client"
import { FitPicStatus } from "generated/globalTypes"
import { SearchInput, SearchType } from "components/SearchInput"
import { COLLECTION_PRODUCTS_QUERY } from "queries/Collection"
import { ProductSelects } from "components/ProductSelects"
import { useSnackbarContext } from "components/Snackbar"

const publishedChoices = [
  { value: FitPicStatus.Submitted, display: "Submitted", disabled: true },
  { value: FitPicStatus.Published, display: "Published" },
  { value: FitPicStatus.Unpublished, display: "Unpublished" },
]

export const FitPicView: React.FC<{ match: any; history: any }> = ({ match, history }) => {
  const { id } = match.params
  const refresh = useRefresh()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedProductIDs, setSelectedProductIDs] = useState([] as string[])
  const { showSnackbar } = useSnackbarContext()
  const onMutationError = (error: ApolloError) =>
    showSnackbar({
      message: error?.message,
      status: "error",
    })
  const [updateFitPic] = useMutation(UPDATE_FIT_PIC, {
    onCompleted: () => {
      showSnackbar({
        message: "Success!",
        status: "success",
      })
      setIsSubmitting(true)
    },
    onError: onMutationError,
  })
  const [deleteFitPic] = useMutation(DELETE_FIT_PIC, {
    onCompleted: () => setIsSubmitting(true),
    onError: onMutationError,
  })
  const { data: productsQueryData } = useQuery(COLLECTION_PRODUCTS_QUERY, {
    variables: { productIDs: selectedProductIDs },
  })
  const selectedProducts = productsQueryData?.products

  const { data, loading, loaded, error } = useQueryWithStore({
    type: "getOne",
    resource: "FitPic",
    payload: { id },
  })

  useEffect(() => {
    if (selectedProductIDs.length === 0 && data?.products?.length > 0) {
      setSelectedProductIDs(data.products?.map(a => a.id) || [])
    }
  }, [data])

  if (!loaded && loading) return <Loading />
  if (error || !data) return <Box>{error.message}</Box>
  const reservedProducts = data?.user?.customer?.reservations?.reduce((acc, curval) => {
    return [...acc, ...curval?.products?.map(a => a.productVariant.product)]
  }, [])

  const onSubmit = async ({ status }) => {
    let data = { status, products: { set: selectedProductIDs.map(id => ({ id })) } }
    await updateFitPic({ variables: { id, data } })
    refresh()
  }

  const onDelete = async () => {
    await deleteFitPic({ variables: { id } })
    history.push(`/content/community`)
  }

  const fitPic = data as fitPic
  const updatedAt = DateTime.fromISO(fitPic.updatedAt)

  return (
    <Container maxWidth={false}>
      <Wizard onSubmit={onSubmit} submitting={isSubmitting} submitButtonTitle="Save">
        <>
          <Header
            title="Fit Pic"
            subtitle={`Updated on ${updatedAt.monthLong} ${updatedAt.day}, ${updatedAt.year}`}
            breadcrumbs={[
              {
                title: "Community",
                url: "/content/community",
              },
              {
                title: "Fit Pic",
                url: "/content/community/fit-pic",
              },
            ]}
            primaryButton={{ text: "Delete", action: onDelete }}
          />
          <Spacer mt={2} />
          <Grid container spacing={5}>
            <Grid item xs={4}>
              <Box
                display="flex"
                style={{ backgroundColor: colors.white95 }}
                borderRadius={4}
                height={400}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                p={1}
              >
                <img src={data?.image?.url} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Text variant="h6">Author name</Text>
                  <Spacer mt={1} />
                  <TextField name="name" initialValue={fitPic.author} disabled />
                </Grid>
              </Grid>
              <Spacer mt={3} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Text variant="h6">City</Text>
                  <Spacer mt={1} />
                  <TextField name="city" initialValue={fitPic.location?.city ?? ""} disabled />
                </Grid>
                <Grid item xs={6}>
                  <Text variant="h6">State</Text>
                  <Spacer mt={1} />
                  <TextField name="state" initialValue={fitPic.location?.state ?? ""} disabled />
                </Grid>
              </Grid>
              <Spacer mt={3} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Text variant="h6">Status</Text>
                  <Spacer mt={1} />
                  <SelectField name="status" choices={publishedChoices} initialValue={fitPic.status} requiredString />
                </Grid>
                <Grid item xs={6}>
                  <Text variant="h6">Search Products</Text>
                  <Spacer mt={1} />
                  <SearchInput
                    placeholder="Search products or brands"
                    searchType={SearchType.PRODUCT}
                    onResultItemClicked={(result: any) => {
                      const alreadyIncluded = !!selectedProductIDs.find((id: string) => id === result?.data?.id)
                      if (!alreadyIncluded) {
                        setSelectedProductIDs([result.data.id, ...selectedProductIDs])
                      }
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Text variant="h6">{`Selected products: (${selectedProducts?.length})`}</Text>
                  <Spacer mt={1} />
                  <ProductSelects
                    products={selectedProducts}
                    selectedProductIDs={selectedProductIDs}
                    setSelectedProductIDs={setSelectedProductIDs}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Text variant="h6">{`Reserved products: (${reservedProducts?.length})`}</Text>
                  <Spacer mt={1} />
                  <ProductSelects
                    products={reservedProducts}
                    selectedProductIDs={selectedProductIDs}
                    setSelectedProductIDs={setSelectedProductIDs}
                    type="add"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      </Wizard>
      <Spacer mt={18} />
    </Container>
  )
}
