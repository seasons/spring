import React from "react"
import { useQuery } from "react-apollo"
import { useLocation } from "react-router-dom"
import { Loading } from "@seasons/react-admin"
import { useForm } from "react-final-form"
import { Box, Grid, styled as muiStyled, Typography } from "@material-ui/core"
import { Header, Spacer, Text } from "components"
import { PhysicalProductEditQuery_physicalProduct } from "generated/PhysicalProductEditQuery"
import { ProductVariantUpsertQuery_product } from "generated/ProductVariantUpsertQuery"
import { GET_GENERATED_SEASONS_UIDS } from "../queries"
import { PhysicalProductForm } from "../Components"
import { ExpandableSection } from "components"

export interface PhysicalProductsCreateProps {
  inventoryStatuses: { name: string }[]
  newProductCreateData?: any // Passed in when creating new physical products in New product flow
  newVariantsCreateData?: { product: ProductVariantUpsertQuery_product; values: any } // Passed in when creating new physical products in New variants flow
  physicalProducts?: PhysicalProductEditQuery_physicalProduct[] // Passed in when editing physical products
}

export const PhysicalProductsCreate: React.FC<PhysicalProductsCreateProps> = ({
  newProductCreateData,
  newVariantsCreateData,
  inventoryStatuses,
  physicalProducts,
}) => {
  const {
    mutators: { setValue },
  } = useForm()
  const location = useLocation()
  let physicalProductUIDs: string[] = []

  const copyValuesToSiblings = (key, value) => {
    physicalProductUIDs.forEach(uid => {
      const field = `${uid}_${key}`
      setValue(field, value)
    })
  }

  // Sizes data here is used to get generated seasons UIDs in
  // the create new variants flow
  const sizes: { manufacturerSize: string; internalSize: string; count: number }[] = []
  if (newVariantsCreateData) {
    const { values: formValues } = newVariantsCreateData

    // Figure out number of variants we are creating
    const maxVariantIndex = Object.keys(formValues).reduce((maxVariantIndex, formKey) => {
      const variantIndex = Number(formKey.split("_")[0])
      return Math.max(maxVariantIndex, variantIndex)
    }, -1)
    const numVariants = maxVariantIndex + 1

    Array.from(Array(numVariants).keys()).forEach(index => {
      const count = Number(formValues[`${index}_totalcount`])
      const internalSize = formValues[`${index}_internalSize`]
      const manufacturerSize = formValues[`${index}_manufacturerSize`]
      sizes.push({ manufacturerSize, internalSize, count })
    })
  }

  const locationElements = location.pathname.split("/")
  const indexOfProductInPathname = locationElements.indexOf("product")
  const newProductOrExistingProductId = locationElements[indexOfProductInPathname + 1]
  const productID = newProductOrExistingProductId === "new" ? null : newProductOrExistingProductId
  const { data, loading, error } = useQuery(GET_GENERATED_SEASONS_UIDS, {
    variables: {
      input: {
        brandID: newVariantsCreateData?.product.brand.id || "",
        colorCode: newVariantsCreateData?.product?.color.colorCode || "",
        sizes,
        productID,
      },
    },
  })

  if (newVariantsCreateData) {
    if (!data || loading || error) return <Loading />

    physicalProductUIDs = data?.generatedSeasonsUIDs || []

    // Save SKUs and seasons UIDs in form state to be used in upsertVariants mutation
    let currentSize = ""
    let currentIndex = -1
    let currentSeasonsUIDs: string[] = []
    physicalProductUIDs.forEach((seasonsUID, index) => {
      // Use size in seasons UID to associate seasonsUID with
      // their corresponding variant.
      const parts = seasonsUID.split("-")
      const size = parts[2]
      if (size !== currentSize) {
        if (currentIndex !== -1) {
          // Store all current seasonsUIDs for currentIndex
          setValue(`${currentIndex}_seasonsUIDs`, currentSeasonsUIDs)
          currentSeasonsUIDs = []
        }
        currentIndex += 1
        currentSize = size
      }
      const sku = parts.slice(0, parts.length - 1).join("-")
      // Store sku for this variant
      setValue(`${currentIndex}_sku`, sku)
      currentSeasonsUIDs.push(seasonsUID)

      // Store all current seasonsUIDs when we reach the end of the array
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

  // Only allow [New] and [Used] when creating a new product
  const statuses = [{ name: "New" }, { name: "Used" }]

  const title = "Physical products"
  const breadcrumbs = [
    {
      title: "Products",
      url: "/inventory/products",
    },
  ]

  breadcrumbs.push({
    title: title,
    url: location.pathname,
  })

  return (
    <Box>
      <Header title={title} subtitle="Add metadata to physical products" breadcrumbs={breadcrumbs} />
      <Typography variant="body1" color="textPrimary">
        Note: The first physical product will update all subsequent fields of the same type. It will overwrite the same
        field on subsequent physical products.
      </Typography>
      <ContainerGrid container spacing={2}>
        {physicalProductUIDs.map((uid, index) => (
          <ExpandableSection
            title={uid}
            key={index}
            content={
              <PhysicalProductForm
                inventoryStatuses={inventoryStatuses}
                statuses={statuses}
                uid={uid}
                copyValuesToSiblings={copyValuesToSiblings}
                index={index}
              />
            }
          />
        ))}
        <Spacer mt={2} />
      </ContainerGrid>
      {!isEditing && (
        <>
          <Text variant="h5" opacity={0.5}>
            Note: Submission may take a while so please be patient. You will be redirected upon completion.
          </Text>
          <Spacer mt={8} />
        </>
      )}
    </Box>
  )
}

const ContainerGrid = muiStyled(Grid)({
  width: "100%",
})
