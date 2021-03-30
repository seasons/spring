import React, { useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { Box, Container } from "@material-ui/core"
import { Spacer, Wizard } from "components"
import { LaunchFields } from "./Components/LaunchFields"
import { UPSERT_LAUNCH } from "./mutations"
import { useHistory } from "react-router-dom"
import { LAUNCH_CREATE_QUERY } from "queries/Launch"
import { useSnackbarContext } from "components/Snackbar"

export const LaunchCreate: React.FC = () => {
  const history = useHistory()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data } = useQuery(LAUNCH_CREATE_QUERY)
  const { showSnackbar } = useSnackbarContext()
  const [upsertLaunch] = useMutation(UPSERT_LAUNCH, {
    onCompleted: result => {
      showSnackbar({
        message: "Launch created",
        status: "success",
      })
      history.push(`/inventory/launches/${result.upsertLaunch.id}`)
    },
    onError: error => {
      showSnackbar({
        message: error?.message,
        status: "error",
      })
    },
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
    published: false,
  }

  return (
    <Container maxWidth={false}>
      <Wizard initialValues={initialValues} onSubmit={onSubmit} submitting={isSubmitting}>
        <Box my={1}>
          <LaunchFields headerTitle="New launch" data={data} />
        </Box>
      </Wizard>
      <Spacer mt={18} />
    </Container>
  )
}
