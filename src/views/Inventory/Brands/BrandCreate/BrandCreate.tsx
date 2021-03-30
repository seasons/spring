import React, { useState } from "react"
import { useMutation } from "react-apollo"
import slugify from "slugify"
import { Box, Container } from "@material-ui/core"
import { Spacer, Wizard } from "components"
import { useSnackbarContext } from "components/Snackbar"
import { CREATE_BRAND } from "../mutations"
import { useHistory } from "react-router-dom"
import { BrandFields } from "../BrandComponents"

export const BrandCreate: React.FC = () => {
  const history = useHistory()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showSnackbar } = useSnackbarContext()
  const [createBrand] = useMutation(CREATE_BRAND, {
    onCompleted: result => {
      showSnackbar({
        message: "Brand created",
        status: "success",
      })
      history.push(`/inventory/brands/${result.createBrand.id}`)
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
    const {
      brandCode,
      brandTier,
      description,
      name,
      sinceDate,
      websiteURL,
      basedIn,
      designer,
      featured,
      published,
      externalShopifyIntegrationShopName,
      externalShopifyIntegrationEnabled,
    } = values
    const sinceYear = sinceDate && new Date(sinceDate).getFullYear()
    const numImages = 4
    const logoImage = values[`logoImage_0`]
    const images = [...Array(numImages).keys()].map(index => values[`image_${index}`]).filter(Boolean)
    await createBrand({
      variables: {
        input: {
          brandCode: brandCode.toUpperCase(),
          description,
          basedIn,
          designer,
          logoImage,
          featured,
          published,
          name,
          images,
          since: sinceYear && new Date(sinceYear, 0, 1).toISOString(),
          slug: slugify(name).toLowerCase(),
          tier: brandTier,
          websiteUrl: websiteURL,
          externalShopifyIntegration: {
            shopName: externalShopifyIntegrationShopName,
            enabled: externalShopifyIntegrationEnabled,
          },
        },
      },
    })
    setIsSubmitting(false)
  }

  const initialValues = {
    brandCode: "",
    brandTier: "",
    description: "",
    name: "",
    wesiteURL: "",
    basedIn: "",
    designer: "",
    published: true,
    featured: false,
    externalShopifyIntegrationEnabled: false,
    externalShopifyIntegrationShopName: "",
  }

  return (
    <Container maxWidth={false}>
      <Wizard initialValues={initialValues} onSubmit={onSubmit} submitting={isSubmitting}>
        <Box my={1}>
          <BrandFields headerTitle="New brand" />
        </Box>
      </Wizard>
      <Spacer mt={18} />
    </Container>
  )
}
