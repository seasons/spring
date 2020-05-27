import { Header, Spacer } from "components"
import React, { useState } from "react"
import { getEnumValues, getFormSelectChoices } from "utils/form"

import { Grid } from "@material-ui/core"

import materialsJSON from "data/materials.json"
import { GeneralSection } from "./GeneralSection"
import {
  ProductUpsertQuery,
  ProductUpsertQuery_brands,
  ProductUpsertQuery_categories,
  ProductUpsertQuery_productModels,
} from "generated/ProductUpsertQuery"
import { ProductEditQuery_product } from "generated/ProductEditQuery"
import { MetadataSection } from "./MetadataSection"
import { PhotographySection } from "./PhotographySection"
import { TagsSection } from "./TagsSection"
import { ProductVariantsSection } from "./ProductVariantsSection"
import { useLocation } from "react-router-dom"

export interface OverviewProps {
  data: ProductUpsertQuery
  product?: ProductEditQuery_product
}

export const Overview: React.FC<OverviewProps> = ({ data, product }) => {
  const [productType, setProductType] = useState("Top")
  const location = useLocation()
  let sizes: any[] = []
  const baseSizes = ["XS", "S", "M", "L", "XL", "XXL"]
  switch (productType) {
    case "Top":
      const topSizes: string[] = baseSizes
      sizes = getFormSelectChoices(topSizes)
      break
    case "Bottom":
      // Ensure the baseSizes are included and sorted correctly
      const baseBottomSizes: string[] = Array.from(
        new Set(data.bottomSizes.map(bottomSize => bottomSize?.value || ""))
      ).filter(size => !baseSizes.includes(size))
      baseBottomSizes.sort()
      const bottomSizes = [...baseSizes, ...baseBottomSizes]
      sizes = getFormSelectChoices(bottomSizes)
      break
  }

  const materials = materialsJSON.allMaterials
  const bottomSizeTypeChoices = getFormSelectChoices(getEnumValues(data.bottomSizeTypes))
  const productArchitectures = getEnumValues(data.productArchitectures)
  const productTypes = getEnumValues(data.productTypes)
  const tags = data.tags.map(tag => tag?.name || "").sort()
  const statuses = [
    {
      value: "Available",
      display: "Available",
    },
    {
      value: "NotAvailable",
      display: "Not available",
    },
  ]

  const headerTitle = product?.name || "New product"
  const headerSubtitle = product?.brand?.name || "Please fill out all required fields"
  const imageURLs = product?.images?.map(image => image?.url || "")

  const isEditing = !!product?.variants

  return (
    <>
      <Header
        title={headerTitle}
        subtitle={headerSubtitle}
        breadcrumbs={[
          {
            title: "Products",
            url: "/inventory/products",
          },
          {
            title: headerTitle,
            url: location.pathname,
          },
        ]}
      />
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <PhotographySection imageURLs={imageURLs} numImages={4} />
        </Grid>
        <Grid item xs={8}>
          <GeneralSection
            brands={data.brands.filter(Boolean) as ProductUpsertQuery_brands[]}
            bottomSizeTypeChoices={bottomSizeTypeChoices}
            isEditing={isEditing}
            productType={productType}
            sizes={sizes}
            statuses={statuses}
          />
          <Spacer mt={6} />
          <MetadataSection
            architectures={productArchitectures}
            categories={data.categories.filter(Boolean) as ProductUpsertQuery_categories[]}
            isEditing={isEditing}
            models={data.productModels as ProductUpsertQuery_productModels[]}
            setProductType={setProductType}
            sizes={sizes}
            types={productTypes}
          />
          <Spacer mt={6} />
          <TagsSection materials={materials} tags={tags} />
          {isEditing && (
            <>
              <Spacer mt={6} />
              <ProductVariantsSection variants={product?.variants || []} />
              <Spacer mt={6} />
            </>
          )}
        </Grid>
      </Grid>
    </>
  )
}
