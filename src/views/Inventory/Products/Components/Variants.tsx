import React, { useState } from "react"
import { useQuery } from "react-apollo"
import { useLocation } from "react-router-dom"
import { Box, Grid, styled as muiStyled } from "@material-ui/core"
import { SelectField } from "fields"
import { Header, Loader, Spacer, Text } from "components"
import { GetGeneratedVariantSkus } from "generated/GetGeneratedVariantSkus"
import { VariantEditQuery_productVariant } from "generated/VariantEditQuery"
import { GET_VARIANT_SKUS_AND_SIZE_TYPES } from "../queries"
import { VariantPhysicalProductsSection } from "./VariantPhysicalProductsSection"
import { VariantSizeSection } from "./VariantSizeSection"
import { getFormSelectChoices, getEnumValues } from "utils/form"

export interface VariantsProps {
  initialBottomSizeTypes?: string[] | null
  createData?: any // Passed in when creating new variants
  variants?: VariantEditQuery_productVariant[] // Passed in when editing variants
}

export const Variants: React.FC<VariantsProps> = ({ createData, variants, initialBottomSizeTypes }) => {
  const location = useLocation()
  const [manufacturerSizes, setManufacturerSizes] = useState(initialBottomSizeTypes || [])
  const brandID = createData?.brand || ""
  const colorCode = createData?.color || ""
  const sizeNames = createData?.sizes || []
  const productType = createData?.productType || variants?.[0]?.internalSize?.productType

  const { data, loading, error } = useQuery(GET_VARIANT_SKUS_AND_SIZE_TYPES, {
    variables: {
      input: {
        brandID,
        colorCode,
        sizeNames,
      },
    },
  })

  if (createData && (loading || !data || error)) {
    return <Loader />
  }
  const generatedSKUsData: GetGeneratedVariantSkus = data
  let variantsData
  if (createData && generatedSKUsData.generatedVariantSKUs) {
    // Get variants data from createData and query response
    variantsData = generatedSKUsData.generatedVariantSKUs.map((sku, index) => ({
      sku,
      size: sizeNames[index],
    }))
  } else if (variants) {
    // Get variants data from the already existing variants
    variantsData = variants.map((variant, index) => ({
      sku: variant.sku,
      size: variant.internalSize?.display,
    }))
  } else {
    return null
  }

  if (!variantsData || !productType) {
    return null
  }

  const isEditing = !!variants
  const title = isEditing ? variantsData[0].sku : "Product variants"
  const subtitle = isEditing ? "Edit measurement data" : "Confirm generated product variants"
  const breadcrumbs = [
    {
      title: "Products",
      url: "/inventory/products",
    },
  ]

  if (isEditing && variants && variants.length > 0) {
    const { product } = variants[0]
    breadcrumbs.push({
      title: product.name,
      url: `/inventory/products/${product.id}`,
    })
  }

  breadcrumbs.push({
    title: title,
    url: location.pathname,
  })

  const bottomSizeTypeChoices =
    (!!data?.bottomSizeTypes && [
      ...getFormSelectChoices(getEnumValues(data.bottomSizeTypes)),
      { display: "", value: null },
    ]) ||
    []

  return (
    <Box>
      <ContainerGrid container spacing={2}>
        <Header title={title} subtitle={subtitle} breadcrumbs={breadcrumbs} />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Text variant="h5">Manufacturer size types</Text>
            <Spacer mt={1} />
            <SelectField
              onChange={e => setManufacturerSizes(e.target.value)}
              multiple
              name="bottomSizeTypes"
              choices={bottomSizeTypeChoices}
            />
            <Spacer mt={2} />
          </Grid>
        </Grid>
        {variantsData.map((variant, index) => (
          <VariantSizeSection
            isEditing={isEditing}
            size={variant.size}
            sku={variant.sku}
            productType={productType}
            key={index}
            manufacturerSizes={manufacturerSizes}
            bottomSizes={data?.bottomSizes}
          />
        ))}
        {isEditing && (
          <>
            {variants?.map((variant, index) => (
              <VariantPhysicalProductsSection key={index} physicalProducts={variant.physicalProducts || []} />
            ))}
            <Spacer grid mt={6} />
          </>
        )}
      </ContainerGrid>
    </Box>
  )
}

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})
