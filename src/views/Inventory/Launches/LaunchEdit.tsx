import React, { useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { Loading } from "@seasons/react-admin"
import { Container } from "@material-ui/core"
import { Spacer, Wizard } from "components"
import { useHistory, useParams } from "react-router-dom"
import { LaunchFields } from "./Components/LaunchFields"
import { LAUNCH_EDIT_QUERY } from "queries/Launch"
import { UPSERT_LAUNCH } from "./mutations"
import { useSnackbarContext } from "components/Snackbar"

export const LaunchEdit: React.FC = () => {
  const history = useHistory()
  const { launchID } = useParams<{ launchID: string }>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data } = useQuery(LAUNCH_EDIT_QUERY, {
    variables: { input: { id: launchID } },
  })
  const { showSnackbar } = useSnackbarContext()
  const [upsertLaunch] = useMutation(UPSERT_LAUNCH, {
    refetchQueries: [
      {
        query: LAUNCH_EDIT_QUERY,
        variables: { input: { id: launchID } },
      },
    ],
    onCompleted: result => {
      showSnackbar({
        message: "Launch updated",
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
        where: { id: launchID },
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

  if (!data) {
    return <Loading />
  }

  let initialValues = {} as any

  if (data?.launch) {
    const { launch } = data
    initialValues = {
      launchAt: launch.launchAt,
      brandID: launch.brand?.id,
      collectionID: launch?.collection?.id,
      published: launch.published,
    }
  }

  return (
    <Container maxWidth={false}>
      <Wizard initialValues={initialValues} onSubmit={onSubmit} submitting={isSubmitting}>
        <LaunchFields headerTitle="Edit launch" data={data} />
      </Wizard>
      <Spacer mt={9} />
    </Container>
  )
}
