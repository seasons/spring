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
import { BrandProductTable } from "./BrandProductTable"

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
    const images = [...Array(numImages).keys()]
      .map(index => {
        return values[`image_${index}`]
      })
      .filter(Boolean)

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
          basedIn,
          designer,
          featured,
          published,
          externalShopifyIntegration:
            externalShopifyIntegrationShopName || externalShopifyIntegrationEnabled
              ? {
                  shopName: externalShopifyIntegrationShopName,
                  enabled: externalShopifyIntegrationEnabled,
                }
              : null,
        },
      },
    })
    setIsSubmitting(false)
  }

  if (!data) {
    return <Loading />
  }

  let initialValues = {} as any

  if (data?.brand) {
    const { brand } = data
    initialValues = {
      name: brand.name,
      description: brand.description,
      brandCode: brand.brandCode,
      brandTier: brand.tier,
      websiteURL: brand.websiteUrl,
      basedIn: brand.basedIn,
      designer: brand.designer,
      featured: brand.featured,
      published: brand.published,
      externalShopifyIntegrationShopName: brand?.externalShopifyIntegration?.shopName,
      externalShopifyIntegrationEnabled: brand?.externalShopifyIntegration?.enabled,
    }
    if (brand.since) {
      initialValues.sinceDate = brand.since
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
      <Spacer mt={4} />
      <BrandProductTable brand={data?.brand} />
      <Spacer mt={12} />
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </Container>
  )
}
