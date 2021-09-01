import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { Box, Container } from "@material-ui/core"
import { Spacer, Wizard } from "components"
import { useHistory } from "react-router-dom"
import { useSnackbarContext } from "components/Snackbar"
import { CategoryFields } from "./Components/CategoryFields"
import { UPSERT_CATEGORY } from "./mutations"

export const CategoryCreate: React.FC = () => {
  const history = useHistory()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showSnackbar } = useSnackbarContext()
  const [upsertCategory] = useMutation(UPSERT_CATEGORY, {
    onCompleted: result => {
      showSnackbar({
        message: "Category created",
        status: "success",
      })
      history.push(`/inventory/categories/${result.upsertCategory.id}`)
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

    await upsertCategory({
      variables: {
        where: { id: "" },
        data: {
          ...values,
          recoupment: parseFloat(values.recoupment),
          dryCleaningFee: parseFloat(values.dryCleaningFee),
        },
      },
    })
    setIsSubmitting(false)
  }

  const initialValues = {
    recoupment: 4,
    visible: false,
  }

  return (
    <Container maxWidth={false}>
      <Wizard initialValues={initialValues} onSubmit={onSubmit} submitting={isSubmitting}>
        <Box my={1}>
          <CategoryFields headerTitle="New category" />
        </Box>
      </Wizard>
      <Spacer mt={18} />
    </Container>
  )
}
