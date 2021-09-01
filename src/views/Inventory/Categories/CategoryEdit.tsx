import React, { useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { Loading } from "@seasons/react-admin"
import { Container } from "@material-ui/core"
import { Spacer, Wizard } from "components"
import { useParams } from "react-router-dom"
import { useRefresh } from "@seasons/react-admin"
import { useSnackbarContext } from "components/Snackbar"
import { CATEGORY_EDIT_QUERY } from "queries/Category"
import { CategoryFields } from "./Components/CategoryFields"
import { UPSERT_CATEGORY } from "./mutations"

export const CategoryEdit: React.FC = () => {
  const refresh = useRefresh()
  const { categoryID } = useParams<{ categoryID: string }>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data } = useQuery(CATEGORY_EDIT_QUERY, {
    variables: { input: { id: categoryID } },
  })
  const { showSnackbar } = useSnackbarContext()
  const [upsertCategory] = useMutation(UPSERT_CATEGORY, {
    onCompleted: () => {
      showSnackbar({
        message: "Category updated",
        status: "success",
      })
      refresh()
    },
    onError: error => {
      showSnackbar({
        message: error?.message,
        status: "error",
      })
    },
  })

  const onSubmit = async values => {
    console.log("values", values)
    if (isSubmitting) {
      return
    }
    setIsSubmitting(true)
    await upsertCategory({
      variables: {
        where: { id: categoryID },
        data: {
          ...values,
          recoupment: parseFloat(values.recoupment),
          dryCleaningFee: parseFloat(values.dryCleaningFee),
        },
      },
    })
    setIsSubmitting(false)
  }

  if (!data) {
    return <Loading />
  }

  let initialValues = {} as any

  if (data?.category) {
    const { category } = data
    console.log("category", category)
    initialValues = {
      name: category.name,
      singularName: category.singularName,
      dryCleaningFee: category.dryCleaningFee,
      recoupment: category.recoupment,
      visible: category.visible,
      description: category.description,
    }
  }

  return (
    <Container maxWidth={false}>
      <Wizard initialValues={initialValues} onSubmit={onSubmit} submitting={isSubmitting}>
        <CategoryFields headerTitle="Edit category" />
      </Wizard>
      <Spacer mt={9} />
    </Container>
  )
}
