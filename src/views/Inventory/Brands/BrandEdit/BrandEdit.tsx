import React, { useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import slugify from "slugify"
import { Loading } from "@seasons/react-admin"
import { Container } from "@material-ui/core"
import { Spacer, Wizard, Snackbar } from "components"
import { SnackbarState } from "components/Snackbar"
import { UPDATE_BRAND } from "../mutations"
import { useHistory, useParams } from "react-router-dom"
import { BRAND_EDIT_QUERY } from "queries/Brand"
import { BrandFields } from "../BrandComponents"

export const BrandEdit: React.FC = () => {
  const history = useHistory()
  const { brandID } = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data } = useQuery(BRAND_EDIT_QUERY, {
    variables: { input: { id: brandID } },
  })
  const [updateBrand] = useMutation(UPDATE_BRAND, {
    refetchQueries: [
      {
        query: BRAND_EDIT_QUERY,
        variables: { input: { id: brandID } },
      },
    ],
    onCompleted: result => {
      console.log("result", result)
      toggleSnackbar({
        show: true,
        message: "Brand updated",
        status: "success",
      })
      history.push(`/inventory/brands/${result.updateBrand.id}`)
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
    const numImages = 4
    const images = [...Array(numImages).keys()]
      .map(index => {
        return values[`image_${index}`]
      })
      .filter(Boolean)

    console.log("images", images)

    await updateBrand({
      variables: {
        where: { id: brandID },
        data: {
          brandCode: brandCode.toUpperCase(),
          description,
          name,
          images,
          since: sinceYear && new Date(sinceYear, 0, 1).toISOString(),
          slug: slugify(name).toLowerCase(),
          tier: brandTier,
          websiteUrl: websiteURL,
        },
      },
    })
    setIsSubmitting(false)
  }

  if (!data) {
    return <Loading />
  }

  let initialValues = {}

  if (data?.brand) {
    const { brand } = data
    initialValues = {
      name: brand.name,
      description: brand.description,
      brandCode: brand.brandCode,
      sinceDate: brand.since,
      brandTier: brand.tier,
      websiteURL: brand.websiteUrl,
    }
    brand.images?.forEach((image, index) => {
      initialValues[`image_${index}`] = image.url
    })
  }

  return (
    <Container maxWidth={false}>
      <Wizard initialValues={initialValues} onSubmit={onSubmit} submitting={isSubmitting}>
        <BrandFields headerTitle="Edit brand" />
      </Wizard>
      <Spacer mt={9} />
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </Container>
  )
}
