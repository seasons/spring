import React, { useEffect, useState } from "react"
import { useQuery } from "react-apollo"
import { useLocation } from "react-router-dom"
import { Box, Grid } from "@material-ui/core"
import { ExpandableSection, Header, Spacer, Text } from "components"
import { Loading } from "@seasons/react-admin"
import { GetGeneratedVariantSkus } from "generated/GetGeneratedVariantSkus"
import { VariantEditQuery_productVariant } from "generated/VariantEditQuery"
import { GET_VARIANT_SKUS_AND_SIZE_TYPES } from "../queries"
import { VariantPriceSection } from "./VariantPriceSection"
import { AddPhysicalProductModal } from "views/Inventory/ProductVariants/AddPhysicalProductModal"
import { useField } from "react-final-form"
import { ProductVariantEditSection } from "./ProductVariantEditSection"
import { PhysicalProductSummary } from "views/Inventory/PhysicalProducts/Components"
import { ProductUpsertQuery } from "generated/ProductUpsertQuery"
import slugify from "slugify"
export interface ProductVariantEditSectionProps {
  createData?: any // Passed in when creating new variants
  variants?: VariantEditQuery_productVariant[] // Passed in when editing variants
  refetch?: () => void
  productCreateData?: ProductUpsertQuery
}

export const ProductVariantEditForm: React.FC<ProductVariantEditSectionProps> = ({
  createData,
  variants,
  refetch: refreshPage,
  productCreateData,
}) => {
  const location = useLocation()
  console.log(variants)
  const manufacturerSizeTypeField = useField("manufacturerSizeType")
  const brandID = createData?.brand || variants?.[0]?.product?.brand?.id
  const colorCode = createData?.color || ""
  const sizeNames = createData?.sizes || []
  const productType = createData?.productType || variants?.[0]?.internalSize?.productType
  const slug = slugify(createData?.name || variants?.[0]?.product?.name)
  const [openModal, toggleModal] = useState(false)

  const { data, loading, error, refetch } = useQuery(GET_VARIANT_SKUS_AND_SIZE_TYPES, {
    variables: {
      input: {
        brandID,
        colorCode,
        sizeNames,
        slug,
      },
    },
  })

  useEffect(() => {
    if (!data && !!brandID && sizeNames.length > 0 && !!colorCode) {
      refetch()
    }
  }, [data, brandID, sizeNames, colorCode, refetch])

  if (createData && (loading || !data || error)) {
    return <Loading />
  }
  const generatedSKUsData: GetGeneratedVariantSkus = data
  let variantsData
  let manufacturerSizeType
  if (createData && generatedSKUsData.generatedVariantSKUs) {
    // Data for VariantCreate
    // Get variants data from createData and query response
    variantsData = generatedSKUsData.generatedVariantSKUs.map((sku, index) => ({
      sku,
      size: sizeNames[index],
    }))
    manufacturerSizeType = manufacturerSizeTypeField?.input?.value || createData.manufacturerSizeType
  } else if (variants) {
    // Data for VariantEdit
    // Get variants data from the already existing variants
    variantsData = variants.map(variant => ({
      sku: variant.sku,
      size: variant.internalSize?.display,
      price: variant.price,
      shopifyProductVariant: variant?.shopifyProductVariant,
    }))
    manufacturerSizeType = variants?.[0].manufacturerSizes?.[0]?.type
  } else {
    return null
  }

  let category
  if (productCreateData && createData?.category) {
    category = productCreateData?.categories?.find(cat => {
      return cat?.id === createData.category
    })
  } else if (variants && variants?.length > 0) {
    category = variants?.[0]?.product?.category
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

  return (
    <Box>
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
      <Box display="flex" flexDirection="column">
        {variantsData.map((variant, index) => (
          <Box key={index}>
            <ProductVariantEditSection
              variantIndex={variant.size}
              sku={variant.sku}
              size={variant?.size}
              product={variant?.product}
              category={category}
              productType={productType}
              manufacturerSizeType={manufacturerSizeType}
              isEditing={isEditing}
            />
            <Box mx={2}>
              <Grid container spacing={4}>
                <Grid item xs={8}>
                  <Box mb={8}>
                    <Text variant="h4">Shopify</Text>
                    <Spacer mt={4} />
                    <VariantPriceSection
                      size={variant.size}
                      shopifyProductVariant={variant.shopifyProductVariant}
                      brandID={brandID}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        ))}
      </Box>
      {isEditing && (
        <>
          {variants?.map((variant, index) => (
            <ExpandableSection
              key={index}
              title="Physical products"
              content={
                <Grid container spacing={2}>
                  {(variant?.physicalProducts || []).map((physProd, index) => (
                    <Grid item xs={6} key={index}>
                      <PhysicalProductSummary physicalProduct={physProd} key={index} />
                    </Grid>
                  ))}
                </Grid>
              }
            />
          ))}
          <Spacer grid mt={6} />
        </>
      )}
      <AddPhysicalProductModal
        open={openModal}
        productType={productType}
        productVariant={variants?.[0]}
        onSuccess={() => {
          refreshPage?.()
        }}
      />
    </Box>
  )
}
