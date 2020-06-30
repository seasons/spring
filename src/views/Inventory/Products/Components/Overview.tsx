import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { useRedirect } from "@seasons/react-admin"
import { useLocation } from "react-router-dom"

import { Grid } from "@material-ui/core"
import StoreIcon from "@material-ui/icons/Store"

import { ConfirmationDialog, Header, Spacer } from "components"
import { SnackbarState } from "components/Snackbar"
import materialsJSON from "data/materials.json"
import { SelectChoice } from "fields/SelectField"
import { GeneralSection } from "./GeneralSection"
import {
  ProductUpsertQuery,
  ProductUpsertQuery_brands,
  ProductUpsertQuery_productModels,
} from "generated/ProductUpsertQuery"
import { ProductEditQuery_product } from "generated/ProductEditQuery"
import { MetadataSection } from "./MetadataSection"
import { PhotographySection } from "./PhotographySection"
import { TagsSection } from "./TagsSection"
import { getEnumValues, getFormSelectChoices } from "utils/form"
import { ProductVariantsSection } from "./ProductVariantsSection"
import { UPDATE_PRODUCT } from "../mutations"
import { getSizes } from "../utils"

export interface OverviewProps {
  data: ProductUpsertQuery
  product?: ProductEditQuery_product
  toggleSnackbar?: (state: SnackbarState) => void
}

export const Overview: React.FC<OverviewProps> = ({ data, product, toggleSnackbar }) => {
  const location = useLocation()
  const redirect = useRedirect()
  const [productType, setProductType] = useState("Top")
  const [isLongTermStorageDialogOpen, setIsLongTermStorageDialogOpen] = useState(false)
  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    onError: error => {
      toggleSnackbar?.({
        show: true,
        message: error?.message,
        status: "error",
      })
    },
  })

  const onCloseLongTermStorageDialog = async (agreed: boolean) => {
    // Make sure user has confirmed submission
    if (!agreed) {
      return
    }

    // Update product status to be [Stored]
    const result = await updateProduct({
      variables: {
        where: { id: product?.id },
        data: { status: "Stored" },
      },
    })
    if (result?.data) {
      redirect("/inventory/products")
    }
  }

  let sizes: any[] = []
  console.log("DATA:", data)
  console.log("DATA: SIZES", getSizes({ productType: "Bottom", bottomSizes: data.bottomSizes.filter(Boolean) }))
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
  const materialCategoryChoices = getFormSelectChoices(
    data.productMaterialCategories.map(materialCategory => materialCategory?.slug || "")
  )
  const bottomSizeTypeChoices = getFormSelectChoices(getEnumValues(data.bottomSizeTypes))
  const productArchitectures = getEnumValues(data.productArchitectures)
  const productTypes = getEnumValues(data.productTypes)
  const tags = data.tags.map(tag => tag?.name || "").sort()

  const isEditing = !!product?.variants

  const statuses: SelectChoice[] = [
    {
      value: "Available",
      display: "Available",
    },
    {
      value: "NotAvailable",
      display: "Not available",
    },
  ]

  // Only show Offload and Stored status if editing product and neither should be selectable
  if (isEditing) {
    statuses.push({
      value: "Offloaded",
      display: "Offloaded",
      disabled: true,
    })
    statuses.push({
      value: "Stored",
      display: "Stored",
      disabled: true,
    })
  }

  const headerTitle = product?.name || "New product"
  const headerSubtitle = product?.brand?.name || "Please fill out all required fields"
  const headerPrimaryBtn =
    isEditing && product?.status !== "Stored"
      ? {
          text: "Send to long term storage",
          icon: <StoreIcon />,
          action: () => setIsLongTermStorageDialogOpen(true),
        }
      : undefined

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
        primaryButton={headerPrimaryBtn}
      />
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <PhotographySection numImages={4} />
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
            isEditing={isEditing}
            models={data.productModels as ProductUpsertQuery_productModels[]}
            setProductType={setProductType}
            sizes={sizes}
            types={productTypes}
          />
          <Spacer mt={6} />
          <TagsSection materials={materials} materialCategoryChoices={materialCategoryChoices} tags={tags} />
          {isEditing && product && (
            <>
              <Spacer mt={6} />
              <ProductVariantsSection productID={product.id} variants={product?.variants || []} />
              <Spacer mt={6} />
            </>
          )}
        </Grid>
      </Grid>
      <ConfirmationDialog
        title={`Are you sure you want to send ${product?.name} to long term storage?`}
        body="Sending a product to long term storage means that you want to put it away for the season."
        open={isLongTermStorageDialogOpen}
        setOpen={setIsLongTermStorageDialogOpen}
        onClose={onCloseLongTermStorageDialog}
      />
    </>
  )
}
