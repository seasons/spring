import React from "react"
import { useQuery } from "react-apollo"
import { getFormSelectChoices } from "utils/form"
import { useLocation } from "react-router-dom"
import { Loading } from "@seasons/react-admin"
import { useForm, useFormState } from "react-final-form"

import { Box, Grid, styled as muiStyled } from "@material-ui/core"

import { Header, Spacer, Text } from "components"
import { PhysicalProductEditQuery_physicalProduct } from "generated/PhysicalProductEditQuery"
import { ProductVariantUpsertQuery_product } from "generated/ProductVariantUpsertQuery"
import { PhysicalProductSection } from "./PhysicalProductSection"
import { GET_GENERATED_SEASONS_UIDS } from "../queries"

export interface PhysicalProductsProps {
  physicalProductStatuses: { name: string }[]
  inventoryStatuses: { name: string }[]
  newProductCreateData?: any // Passed in when creating new physical products in New product flow
  newVariantsCreateData?: { product: ProductVariantUpsertQuery_product; values: any } // Passed in when creating new physical products in New variants flow
  physicalProducts?: PhysicalProductEditQuery_physicalProduct[] // Passed in when editing physical products
}

export const PhysicalProducts: React.FC<PhysicalProductsProps> = ({
  newProductCreateData,
  newVariantsCreateData,
  inventoryStatuses,
  physicalProducts,
  physicalProductStatuses,
}) => {
  const {
    mutators: { setValue },
  } = useForm()
  const location = useLocation()

  let physicalProductUIDs: string[] = []

  const sizes: { sizeName: string; count: number }[] = []
  if (newVariantsCreateData) {
    const { values: formValues, product } = newVariantsCreateData
    console.log("VALUES:", formValues)
    let maxVariantIndex = -1
    Object.keys(formValues).forEach(formKey => {
      const variantIndex = Number(formKey.split("_")[0])
      maxVariantIndex = Math.max(maxVariantIndex, variantIndex)
    })

    Array.from(Array(maxVariantIndex + 1).keys()).forEach(index => {
      const count = Number(formValues[`${index}_totalcount`])
      // All size options are of the form { key: string, value: string }
      // where [key] is the size type (i.e. Letter, WxL, etc.) and
      // [value] is the size name (i.e. XS, S, 32x30, etc.)
      switch (product.type) {
        case "Top":
          const sizeOption = formValues[`${index}_lettersize`]
          console.log(`${index}_lettersize`, sizeOption)
          sizes.push({ sizeName: sizeOption.value, count })
          break
        case "Bottom":
          const waist = formValues[`${index}_waist`]
          const inseam = formValues[`${index}_inseam`]
          sizes.push({ sizeName: `${Math.floor(waist)}x${Math.floor(inseam)}`, count })
          break
        default:
          return
      }
    })
  }
  const { data, loading, error } = useQuery(GET_GENERATED_SEASONS_UIDS, {
    variables: {
      input: {
        brandID: newVariantsCreateData?.product.brand.id,
        colorCode: newVariantsCreateData?.product?.color.colorCode,
        sizes,
      },
    },
  })

  if (newVariantsCreateData) {
    console.log("PHYS DATA:", data)
    if (!data || loading || error) return <Loading />

    physicalProductUIDs = data?.generatedSeasonsUIDs || []
    // Save SKUs and seasons UIDs in form state
    let currentSize = ""
    let currentIndex = -1
    let currentSeasonsUIDs: string[] = []
    physicalProductUIDs.forEach((seasonsUID, index) => {
      // Extract size from seasons UID
      const parts = seasonsUID.split("-")
      const size = parts[2]
      if (size !== currentSize) {
        if (currentIndex !== -1) {
          setValue(`${currentIndex}_seasonsUIDs`, currentSeasonsUIDs)
          currentSeasonsUIDs = []
        }
        currentIndex += 1
        currentSize = size
      }
      const sku = parts.slice(0, parts.length - 1).join("-")
      console.log("SKU, UID", sku, seasonsUID)
      setValue(`${currentIndex}_sku`, sku)
      currentSeasonsUIDs.push(seasonsUID)

      if (index === physicalProductUIDs.length - 1) {
        setValue(`${currentIndex}_seasonsUIDs`, currentSeasonsUIDs)
        currentSeasonsUIDs = []
      }
    })
  } else if (newProductCreateData) {
    // Read createData to get SKU's and total count for each SKU
    const sizes = newProductCreateData?.sizes || []
    const sizesToSKUs = {}
    const sizesToTotalCounts = {}
    Object.entries(newProductCreateData).forEach(([key, value]) => {
      const components = key.split("_")
      if (components.length === 2) {
        const size = components[0]
        switch (components[1]) {
          case "sku":
            sizesToSKUs[size] = value
            break
          case "totalcount":
            const valueAsString = value as string
            sizesToTotalCounts[size] = parseInt(valueAsString) || 0
            break
          default:
            break
        }
      }
    })

    // Form the seasonsUID using SKU and total count
    sizes.forEach(size => {
      const sku: string = sizesToSKUs[size]
      const totalCount: number = sizesToTotalCounts[size]
      Array.from(Array(totalCount).keys()).forEach((_, index) => {
        physicalProductUIDs.push(`${sku}-${(index + 1).toString().padStart(2, "0")}`)
      })
    })
  } else if (physicalProducts) {
    // If physicalProducts already exist, just extract their seasonsUID
    physicalProducts.forEach(physicalProduct => physicalProductUIDs.push(physicalProduct.seasonsUID))
  }

  const isEditing = !!physicalProducts

  const inventoryStatusChoices = getFormSelectChoices(inventoryStatuses.map(status => status.name)).map(a => ({
    ...a,
    disabled: ["Stored", "Offloaded"].includes(a.value),
  }))
  // Only allow [New] and [Used] when creating a new product
  const statuses = isEditing ? physicalProductStatuses : [{ name: "New" }, { name: "Used" }]
  const statusChoices = getFormSelectChoices(statuses.map(status => status.name))

  const title = isEditing ? physicalProducts?.[0]?.seasonsUID || "" : "Physical products"
  const subtitle = isEditing ? "Edit physical product data" : "Add metadata to physical products"
  const breadcrumbs = [
    {
      title: "Products",
      url: "/inventory/products",
    },
  ]

  if (isEditing && physicalProducts && physicalProducts.length > 0) {
    const { productVariant } = physicalProducts[0]
    const { product } = productVariant
    breadcrumbs.push({
      title: product.name,
      url: `/inventory/products/${product.id}`,
    })
    breadcrumbs.push({
      title: productVariant.sku || "",
      url: `/inventory/product/variants/${productVariant.id}`,
    })
  }

  breadcrumbs.push({
    title: title,
    url: location.pathname,
  })

  return (
    <Box>
      <ContainerGrid container spacing={2}>
        <Header title={title} subtitle={subtitle} breadcrumbs={breadcrumbs} />
        {physicalProductUIDs.map((uid, index) => (
          <PhysicalProductSection
            inventoryStatusChoices={inventoryStatusChoices}
            statusChoices={statusChoices}
            uid={uid}
            key={index}
          />
        ))}
        <Spacer mt={2} />
        {!isEditing && (
          <>
            <Text variant="h5" opacity={0.5}>
              Note: Submission may take a while so please be patient. You will be redirected upon completion.
            </Text>
            <Spacer mt={8} />
          </>
        )}
      </ContainerGrid>
    </Box>
  )
}

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})
