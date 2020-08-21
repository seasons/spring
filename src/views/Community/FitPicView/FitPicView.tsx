import { Container, Box, Grid } from "@material-ui/core"
import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { useQueryWithStore, Loading } from "@seasons/react-admin"
import { useRefresh } from "@seasons/react-admin"
import { Header, Spacer, Snackbar, Text, Wizard } from "components"
import { SnackbarState } from "components/Snackbar"
import { fitPic } from "generated/fitPic"
import { SelectField, TextField } from "fields"
import { DateTime } from "luxon"
import { UPDATE_FIT_PIC, DELETE_FIT_PIC } from "../mutations"
import { colors } from "theme/colors"
import { ApolloError } from "apollo-client"
import { FitPicStatus } from "generated/globalTypes"

const publishedChoices = [
  { value: FitPicStatus.Submitted, display: "Submitted", disabled: true },
  { value: FitPicStatus.Published, display: "Published" },
  { value: FitPicStatus.Unpublished, display: "Unpublished" },
]

export const FitPicView: React.FC<{ match: any; history: any }> = ({ match, history }) => {
  const { id } = match.params
  const refresh = useRefresh()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const onMutationError = (error: ApolloError) =>
    toggleSnackbar({
      show: true,
      message: error?.message,
      status: "error",
    })
  const [updateFitPic] = useMutation(UPDATE_FIT_PIC, {
    onCompleted: () => setIsSubmitting(true),
    onError: onMutationError,
  })
  const [deleteFitPic] = useMutation(DELETE_FIT_PIC, {
    onCompleted: () => setIsSubmitting(true),
    onError: onMutationError,
  })
  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })
  const { data, loading, loaded, error } = useQueryWithStore({
    type: "getOne",
    resource: "FitPic",
    payload: { id },
  })

  if (!loaded && loading) return <Loading />
  if (error || !data) return <Box>{error.message}</Box>

  const onSubmit = async ({ status }) => {
    await updateFitPic({ variables: { id, data: { status } } })
    refresh()
  }

  const onDelete = async () => {
    await deleteFitPic({ variables: { id } })
    history.push(`/community`)
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
                url: "/community",
              },
              {
                title: "Fit Pic",
                url: "/community/fit-pic",
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
                <img
                  src={data?.image?.url}
                  alt="Image"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
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
                <Grid item xs={12}>
                  <Text variant="h6">Status</Text>
                  <Spacer mt={1} />
                  <SelectField name="status" choices={publishedChoices} initialValue={fitPic.status} requiredString />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      </Wizard>
      <Spacer mt={18} />
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </Container>
  )
}
