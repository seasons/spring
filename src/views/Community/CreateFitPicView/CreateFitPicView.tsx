import { Container } from "@material-ui/core"
import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { useHistory } from "react-router-dom"

import { Spacer, Wizard } from "components"
import { Overview } from "./Components"
import { SUBMIT_FIT_PIC, UPDATE_FIT_PIC } from "../mutations"
import { ApolloError } from "apollo-client"
import { FitPicStatus } from "generated/globalTypes"
import { useSnackbarContext } from "components/Snackbar"

type FormValues = { status?: FitPicStatus; image?: File; city?: string; state?: string; zipCode?: string }

export const CreateFitPicView: React.FC = () => {
  const history = useHistory()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showSnackbar } = useSnackbarContext()
  const onMutationError = (error: ApolloError) => {
    showSnackbar({
      message: error?.message,
      status: "error",
    })
  }
  const [updateFitPic] = useMutation(UPDATE_FIT_PIC, { onError: onMutationError })
  const [createFitPic] = useMutation(SUBMIT_FIT_PIC, {
    onCompleted: () => setIsSubmitting(false),
    onError: onMutationError,
  })

  const onSubmit = async ({ status, city, image, state, zipCode }: FormValues) => {
    if (!image) {
      showSnackbar({
        message: "An image is required.",
        status: "error",
      })
      return
    } else if (isSubmitting) {
      return
    }
    setIsSubmitting(true)
    const result = await createFitPic({
      variables: {
        image,
        location: { create: { city, state, zipCode } },
      },
    })
    const id = result?.data?.submitFitPic
    if (id) {
      if (status === "Published") {
        await updateFitPic({
          variables: {
            id,
            data: { status },
          },
        })
        history.push(`/content/community/fit-pic/${id}`)
      } else {
        // Redirect to community page
        history.push(`/content/community/fit-pic/${id}`)
      }
    }
  }

  return (
    <Container maxWidth={false}>
      <Wizard onSubmit={onSubmit} submitting={isSubmitting} submitButtonTitle="Save">
        <Overview />
      </Wizard>
      <Spacer mt={18} />
    </Container>
  )
}
