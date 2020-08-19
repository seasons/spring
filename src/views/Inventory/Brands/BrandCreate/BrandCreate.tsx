import React, { useState } from "react"
import { useMutation } from "react-apollo"
import slugify from "slugify"
import { Box, Container } from "@material-ui/core"
import { Header, Spacer, Wizard, Snackbar } from "components"
import { SnackbarState } from "components/Snackbar"
import { CREATE_BRAND } from "../mutations"
import { useHistory, useLocation } from "react-router-dom"
import { BrandFields } from "../BrandComponents"

export const BrandCreate: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createBrand] = useMutation(CREATE_BRAND, {
    onCompleted: result => {
      toggleSnackbar({
        show: true,
        message: "Brand created",
        status: "success",
      })
      history.push(`/inventory/brands/${result.createBrand.id}`)
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
    const { brandCode, brandTier, description, name, sinceDate, websiteURL } = values
    const sinceYear = sinceDate && new Date(sinceDate).getFullYear()
    await createBrand({
      variables: {
        input: {
          brandCode: brandCode.toUpperCase(),
          description,
          name,
          since: sinceYear && new Date(sinceYear, 0, 1).toISOString(),
          slug: slugify(name).toLowerCase(),
          tier: brandTier,
          websiteUrl: websiteURL,
        },
      },
    })
    setIsSubmitting(false)
  }

  const initialValues = { brandCode: "", brandTier: "", description: "", name: "", wesiteURL: "" }

  return (
    <Container maxWidth={false}>
      <Wizard initialValues={initialValues} onSubmit={onSubmit} submitting={isSubmitting}>
        <Box my={1}>
          <BrandFields headerTitle="New brand" />
        </Box>
      </Wizard>
      <Spacer mt={18} />
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </Container>
  )
}
