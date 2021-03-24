import React, { useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { Box, Container } from "@material-ui/core"
import { Spacer, Wizard, Snackbar } from "components"
import { SnackbarState } from "components/Snackbar"
import { LaunchFields } from "./Components/LaunchFields"
import { UPSERT_LAUNCH } from "./mutations"
import { useHistory } from "react-router-dom"
import { LAUNCH_CREATE_QUERY } from "queries/Launch"

export const LaunchCreate: React.FC = () => {
  const history = useHistory()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data } = useQuery(LAUNCH_CREATE_QUERY)
  const [upsertLaunch] = useMutation(UPSERT_LAUNCH, {
    onCompleted: result => {
      toggleSnackbar({
        show: true,
        message: "Launch created",
        status: "success",
      })
      history.push(`/inventory/launches/${result.upsertLaunch.id}`)
    },
    onError: error => {
      toggleSnackbar({
        show: true,
        message: error?.message,
        status: "error",
      })
    },
  })

  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })

  const onSubmit = async values => {
    if (isSubmitting) {
      return
    }
    setIsSubmitting(true)
    const { brandID, launchAt, collectionID, published } = values

    await upsertLaunch({
      variables: {
        where: { id: "" },
        data: {
          launchAt,
          brandID,
          collectionID,
          published,
        },
      },
    })
    setIsSubmitting(false)
  }

  const initialValues = {
    launchAt: "",
    published: true,
  }

  return (
    <Container maxWidth={false}>
      <Wizard initialValues={initialValues} onSubmit={onSubmit} submitting={isSubmitting}>
        <Box my={1}>
          <LaunchFields headerTitle="New launch" data={data} />
        </Box>
      </Wizard>
      <Spacer mt={18} />
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </Container>
  )
}
