import React, { useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import slugify from "slugify"
import { Loading } from "@seasons/react-admin"
import { Container } from "@material-ui/core"
import { Spacer, Wizard } from "components"
import { UPDATE_BRAND } from "../mutations"
import { useHistory, useParams } from "react-router-dom"
import { BRAND_EDIT_QUERY } from "queries/Brand"
import { BrandFields } from "../BrandComponents"
import { BrandProductTable } from "./BrandProductTable"
import { useSnackbarContext } from "components/Snackbar"

export const BrandEdit: React.FC = () => {
  const history = useHistory()
  const { brandID } = useParams<{ brandID: string }>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data } = useQuery(BRAND_EDIT_QUERY, {
    variables: { input: { id: brandID } },
  })
  const { showSnackbar } = useSnackbarContext()
  const [updateBrand] = useMutation(UPDATE_BRAND, {
    refetchQueries: [
      {
        query: BRAND_EDIT_QUERY,
        variables: { input: { id: brandID } },
      },
    ],
    onCompleted: result => {
      showSnackbar({
        message: "Brand updated",
        status: "success",
      })
      history.push(`/inventory/brands/${result.updateBrand.id}`)
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
      shopifyShopShopName,
      shopifyShopEnabled,
      styles,
    } = values
    const sinceYear = sinceDate && new Date(sinceDate).getFullYear()
    const numImages = 4
    const logoImage = values[`logoImage_0`]
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
          styles,
          logoImage,
          images,
          since: sinceYear && new Date(sinceYear, 0, 1).toISOString(),
          slug: slugify(name).toLowerCase(),
          tier: brandTier,
          websiteUrl: websiteURL,
          basedIn,
          designer,
          featured,
          published,
          shopifyShop:
            shopifyShopShopName || shopifyShopEnabled
              ? {
                  shopName: shopifyShopShopName,
                  enabled: shopifyShopEnabled,
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
      styles: brand.styles,
      published: brand.published,
      shopifyShopShopName: brand?.shopifyShop?.shopName,
      shopifyShopEnabled: brand?.shopifyShop?.enabled,
    }
    initialValues[`logoImage_0`] = brand.logoImage?.url
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
    </Container>
  )
}
