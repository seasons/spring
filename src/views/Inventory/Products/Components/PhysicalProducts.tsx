import React from "react"
import { getFormSelectChoices } from "utils/form"
import { useLocation } from "react-router-dom"

import { Box, Grid, styled as muiStyled } from "@material-ui/core"

import { Header, Spacer, Text } from "components"
import { PhysicalProductEditQuery_physicalProduct } from "generated/PhysicalProductEditQuery"
import { PhysicalProductSection } from "./PhysicalProductSection"

export interface PhysicalProductsProps {
  physicalProductStatuses: { name: string }[]
  inventoryStatuses: { name: string }[]
  createData?: any // Passed in when creating new physical products
  physicalProducts?: PhysicalProductEditQuery_physicalProduct[] // Passed in when editing physical products
}

export const PhysicalProducts: React.FC<PhysicalProductsProps> = ({
  createData,
  inventoryStatuses,
  physicalProducts,
  physicalProductStatuses,
}) => {
  const location = useLocation()
  const physicalProductUIDs: string[] = []

  if (createData) {
    // Read createData to get SKU's and total count for each SKU
    const sizes = createData?.sizes || []
    const sizesToSKUs = {}
    const sizesToTotalCounts = {}
    Object.entries(createData).forEach(([key, value]) => {
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

  const inventoryStatusChoices = getFormSelectChoices(inventoryStatuses.map(status => status.name))
  const statusChoices = getFormSelectChoices(physicalProductStatuses.map(status => status.name))

  const isEditing = !!physicalProducts
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
