import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { useLocation } from "react-router-dom"
import { Grid } from "@material-ui/core"
import { ConfirmationDialog, Header, Spacer, ImageUpload } from "components"
import materialsJSON from "data/materials.json"
import { SelectChoice } from "fields/SelectField"
import { GeneralSection } from "./Components/GeneralSection"
import {
  ProductUpsertQuery,
  ProductUpsertQuery_brands,
  ProductUpsertQuery_categories,
  ProductUpsertQuery_productModels,
} from "generated/ProductUpsertQuery"
import { ProductEditQuery_product } from "generated/ProductEditQuery"
import { MetadataSection } from "./Components/MetadataSection"
import { TagsSection } from "./Components/TagsSection"
import { getEnumValues, getFormSelectChoices } from "utils/form"
import { ProductOverviewVariantsSection } from "./Components/ProductOverviewVariantsSection"
import { UPDATE_PRODUCT } from "../../mutations"
import { DateTime } from "luxon"
import { PRODUCT_EDIT_QUERY } from "../../queries"
import { SeasonsSection } from "./Components/SeasonsSection"
import { useSnackbarContext } from "components/Snackbar"
import { wxlBottomSizes, US_LETTER_SIZES, getManufacturerSizes, ACCESSORY_SIZE_TYPES } from "utils/sizes"
import { useField } from "react-final-form"

export interface ProductOverviewStepProps {
  data: ProductUpsertQuery
  product?: ProductEditQuery_product
  productType: string
  setProductType: (string) => void
}

export const ProductOverviewStep: React.FC<ProductOverviewStepProps> = ({
  data,
  product,
  productType,
  setProductType,
}) => {
  const location = useLocation()
  const manufacturerSizeTypeField = useField("manufacturerSizeType")
  const manufacturerSizeType = manufacturerSizeTypeField?.input?.value

  const [isLongTermStorageDialogOpen, setIsLongTermStorageDialogOpen] = useState(false)
  const [isRestoreFromLongTermStorageDialogOpen, setIsRestoreFromLongTermStorageDialogOpen] = useState(false)
  const { showSnackbar } = useSnackbarContext()
  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [
      {
        query: PRODUCT_EDIT_QUERY,
        variables: { input: { id: product?.id }, productType },
      },
    ],
    onError: error => {
      showSnackbar({
        message: error?.message,
        status: "error",
      })
    },
    onCompleted: data => {
      showSnackbar({
        message: "Success!",
        status: "success",
      })
    },
  })

  const onCloseLongTermStorageDialog = async (agreed: boolean) => {
    // Make sure user has confirmed submission
    if (!agreed) {
      return
    }

    // Update product status to be [Stored]
    await updateProduct({
      variables: {
        where: { id: product?.id },
        data: { status: "Stored" },
      },
    })
  }

  const onCloseRestoreFromLongTermStorageDialog = async (agreed: boolean) => {
    // Make sure user has confirmed submission
    if (!agreed) {
      return
    }
    // Update product status to be [Stored]
    await updateProduct({
      variables: {
        where: { id: product?.id },
        data: { status: "NotAvailable" },
      },
    })
  }

  const manufacturerSizes: any[] = getFormSelectChoices(getManufacturerSizes(manufacturerSizeType))

  let internalSizes: any[] = []
  switch (productType) {
    case "Top":
      const topSizes: string[] = US_LETTER_SIZES
      internalSizes = getFormSelectChoices(topSizes)
      break
    case "Bottom":
      internalSizes = getFormSelectChoices(wxlBottomSizes())
      break
    case "Accessory":
      internalSizes = getFormSelectChoices(ACCESSORY_SIZE_TYPES)
      break
  }

  const materials = materialsJSON.allMaterials
  const materialCategoryChoices = getFormSelectChoices(
    data.productMaterialCategories.map(materialCategory => materialCategory?.slug || "")
  )
  const productArchitectures = getEnumValues(data.productArchitectures)
  const productTypes = getEnumValues(data.productTypes)
  const tags = data.tags.map(tag => tag?.name || "").sort()
  const buyNewEnabled = product?.buyNewEnabled || false
  const buyUsedEnabled = product?.buyUsedEnabled || false
  const buyUsedPrice = product?.buyUsedPrice

  const isEditing = !!product?.variants

  const availabilityStatuses: SelectChoice[] = [
    {
      value: "Available",
      display: "Available",
    },
    {
      value: "NotAvailable",
      display: "Not available",
    },
  ]

  const photographyStatuses: SelectChoice[] = [
    {
      value: "Done",
      display: "Done",
    },
    {
      value: "InProgress",
      display: "In Progress",
    },
    {
      value: "ReadyForEditing",
      display: "Ready For Editing",
    },
    {
      value: "ReadyToShoot",
      display: "Ready To Shoot",
    },
    {
      value: "Steam",
      display: "Steam",
    },
  ]

  const productTiers: SelectChoice[] = [
    {
      value: "Luxury",
      display: "Luxury",
    },
    {
      value: "Standard",
      display: "Standard",
    },
  ]

  // Only show Offload and Stored status if editing product and neither should be selectable
  if (isEditing) {
    availabilityStatuses.push({
      value: "Offloaded",
      display: "Offloaded",
      disabled: true,
    })
    availabilityStatuses.push({
      value: "Stored",
      display: "Stored",
      disabled: true,
    })
  }

  const headerTitle = product?.name || "New product"
  const headerSubtitle = product?.brand?.name || "Please fill out all required fields"

  const menuItems = [
    {
      text: "Republish",
      action: async () =>
        await updateProduct({
          variables: {
            where: { id: product?.id },
            data: { publishedAt: DateTime.local() },
          },
        }),
    },
  ] as any

  if (isEditing) {
    if (product?.status === "Stored") {
      menuItems.push({
        text: "Restore from long term storage",
        action: () => setIsRestoreFromLongTermStorageDialogOpen(true),
      })
    } else {
      menuItems.push({
        text: "Send to long term storage",
        action: () => setIsLongTermStorageDialogOpen(true),
      })
    }
  }

  return (
    <>
      <Header
        title={headerTitle}
        subtitle={headerSubtitle}
        publishedAt={product?.publishedAt}
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
        primaryButton={null}
        menuItems={menuItems}
      />
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <ImageUpload numImages={4} />
        </Grid>
        <Grid item xs={8}>
          <GeneralSection
            brands={data.brands.filter(Boolean) as ProductUpsertQuery_brands[]}
            isEditing={isEditing}
            productType={productType}
            internalSizes={internalSizes}
            availabilityStatuses={availabilityStatuses}
            photographyStatuses={photographyStatuses}
            types={productTypes}
            setProductType={setProductType}
            product={product}
            categories={data.categories.filter(Boolean) as ProductUpsertQuery_categories[]}
          />
          <Spacer mt={6} />
          <MetadataSection
            architectures={productArchitectures}
            models={data.productModels as ProductUpsertQuery_productModels[]}
            manufacturerSizes={manufacturerSizes}
            buyNewEnabled={buyNewEnabled}
            buyUsedEnabled={buyUsedEnabled}
            buyUsedPrice={buyUsedPrice}
            productTiers={productTiers}
          />
          <Spacer mt={6} />
          <SeasonsSection
            architectures={productArchitectures}
            models={data.productModels as ProductUpsertQuery_productModels[]}
          />
          <Spacer mt={6} />
          <TagsSection materials={materials} materialCategoryChoices={materialCategoryChoices} tags={tags} />
          {isEditing && product && (
            <>
              <Spacer mt={6} />
              <ProductOverviewVariantsSection
                productID={product.id}
                variants={product?.variants || []}
                productType={productType}
              />
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
      <ConfirmationDialog
        title={`Are you sure you want to retrieve ${product?.name} from long term storage?`}
        body="This will mark the product as Not Available, with all child physical products NonReservable. You'll need to publish it separately."
        open={isRestoreFromLongTermStorageDialogOpen}
        setOpen={setIsRestoreFromLongTermStorageDialogOpen}
        onClose={onCloseRestoreFromLongTermStorageDialog}
      />
    </>
  )
}
