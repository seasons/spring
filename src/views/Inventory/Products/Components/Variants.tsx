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
import { VariantPriceSection } from "./VariantPriceSection"
import { getFormSelectChoices } from "utils/form"
import { AddPhysicalProductModal } from "views/Inventory/ProductVariants/AddPhysicalProductModal"
import { MANUFACTURER_SIZE_TYPES } from "utils/sizes"
import { useForm, useFormState } from "react-final-form"

export interface VariantsProps {
  createData?: any // Passed in when creating new variants
  variants?: VariantEditQuery_productVariant[] // Passed in when editing variants
  refetch?: () => void
}

export const Variants: React.FC<VariantsProps> = ({ createData, variants, refetch }) => {
  const location = useLocation()
  const form = useForm()
  const formState = useFormState()
  const [manufacturerSizeType, setManufacturerSizeType] = useState(
    variants?.[0]?.manufacturerSizes?.[0]?.bottom?.type ?? null
  )
  const brandID = createData?.brand || ""
  const colorCode = createData?.color || ""
  const sizeNames = createData?.sizes || []
  const productType = createData?.productType || variants?.[0]?.internalSize?.productType
  const [openModal, toggleModal] = useState(false)
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
    variantsData = variants.map(variant => ({
      sku: variant.sku,
      size: variant.internalSize?.display,
      price: variant.price,
      shopifyProductVariant: variant?.shopifyProductVariant,
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

  const bottomSizeTypeChoices = getFormSelectChoices(MANUFACTURER_SIZE_TYPES)

  return (
    <Box>
      <ContainerGrid container spacing={2}>
        <Header
          title={title}
          subtitle={subtitle}
          breadcrumbs={breadcrumbs}
          primaryButton={{
            text: "Add physical products",
            action: () => {
              toggleModal(true)
            },
          }}
        />
        {productType === "Bottom" && (
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Text variant="h5">Manufacturer size type</Text>
              <Spacer mt={1} />
              <SelectField
                onChange={e => {
                  // Cleanup variant sizes of previous type
                  if (e.target.value !== manufacturerSizeType) {
                    variants?.forEach(v => {
                      const fieldName = `${v.internalSize?.display}_manufacturerSize_${manufacturerSizeType}`
                      form.change(fieldName, undefined)
                    })
                  }
                  setManufacturerSizeType(e.target.value)
                }}
                name="manufacturerBottomSizeType"
                choices={bottomSizeTypeChoices}
              />
              <Spacer mt={2} />
            </Grid>
          </Grid>
        )}
        {variantsData.map((variant, index) => (
          <Box key={index}>
            <VariantSizeSection
              isEditing={isEditing}
              size={variant.size}
              sku={variant.sku}
              productType={productType}
              key={index}
              manufacturerSizeType={manufacturerSizeType}
              bottomSizes={data?.bottomSizes}
            />
            <VariantPriceSection size={variant.size} shopifyProductVariant={variant.shopifyProductVariant} />
          </Box>
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
      <AddPhysicalProductModal
        open={openModal}
        productVariant={variants?.[0]}
        onSuccess={() => {
          refetch?.()
        }}
      />
    </Box>
  )
}

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})
