import { Box } from "@material-ui/core"
import React, { useState } from "react"
import { useQuery, useMutation } from "react-apollo"
import { useHistory } from "react-router-dom"

import { Spacer, Wizard } from "components"
import { Overview, Variants, PhysicalProducts } from "../Components"
import { PRODUCT_CREATE_QUERY } from "../queries"
import { UPSERT_PRODUCT } from "../mutations"

export interface ProductCreateProps {
  history: any
  match: any
  props?: any
}

export const ProductCreate = props => {
  const history = useHistory()
  const { data, loading } = useQuery(PRODUCT_CREATE_QUERY)
  const [upsertProduct] = useMutation(UPSERT_PRODUCT)
  const [values, setValues] = useState({})

  if (
    loading ||
    !data?.bottomSizes ||
    !data?.bottomSizeTypes ||
    !data?.brands ||
    !data?.categories ||
    !data?.colors ||
    !data?.physicalProductStatuses ||
    !data?.products ||
    !data?.productArchitectures ||
    !data?.productFunctions ||
    !data?.productModels ||
    !data?.productTypes ||
    !data?.topSizes
  ) {
    return <div>Loading</div>
  }
  console.log("DATA:", data)

  const onNext = values => {
    setValues(values)
  }

  const onSubmit = async values => {
    console.log("SUBMITTED VALUES FINAL:", values)
    // Extract appropriate values from the WizardForm
    const {
      architecture,
      bottomSizeType,
      brand: brandID,
      category: categoryID,
      color: colorID,
      description,
      functions,
      innerMaterials,
      model: modelID,
      modelSize: modelSizeName,
      name,
      outerMaterials,
      productType,
      retailPrice,
      season,
      secondaryColor: secondaryColorID,
      sizes,
      status,
      subCategory: subCategoryID,
      tags,
    } = values

    // Get the image files which are stored as image_0, image_1, etc.
    const numImages = 4
    const images = [...Array(numImages).keys()].map(index => {
      return values[`image_${index}`]
    })

    // Get the modelSizeDisplay which is usually just the modelSizeName except
    // for when it is a bottom whose type is not Letter.
    let modelSizeDisplay
    switch (productType) {
      case "Top":
        modelSizeDisplay = modelSizeName
        break
      case "Bottom":
        modelSizeDisplay = bottomSizeType === "Letter" ? modelSizeName : `${bottomSizeType} ${modelSizeName}`
    }

    // Get dictionary of product variant SKUs to their sizes
    const skusToSizes = {}
    Object.entries(values).forEach(entry => {
      const key = entry[0]
      const value = entry[1] as string
      if (key.includes("_sku")) {
        const sku = value
        const size = key.split("_")[0]
        skusToSizes[sku] = size
      }
    })

    // Get physical products data by using their seasonsUID as the key
    const physicalProductFieldKeys = ["inventoryStatus", "physicalProductStatus"]
    const seasonsUIDToData = {}
    Object.keys(values).forEach(key => {
      const value = values[key]
      if (physicalProductFieldKeys.some(fieldKey => key.includes(fieldKey))) {
        // Key is of the form <seasonsUID>_<fieldKey>, i.e. ALMC-BLU-SS-001-01_dateOrdered
        const [seasonsUID, fieldKey] = key.split("_")
        if (seasonsUIDToData[seasonsUID]) {
          seasonsUIDToData[seasonsUID][fieldKey] = value
        } else {
          seasonsUIDToData[seasonsUID] = { [fieldKey]: value }
        }
      }
    })

    // Get variants data by looping through the SKUs
    const variantsData = Object.keys(skusToSizes).map(sku => {
      const size = skusToSizes[sku]
      const variantData = {
        sku,
        internalSizeName: size,
        bottomSizeType,
      }
      const genericMeasurementKeys = ["weight", "totalcount"]
      let measurementKeys
      switch (productType) {
        case "Top":
          measurementKeys = ["sleeve", "shoulder", "chest", "neck", "length", ...genericMeasurementKeys]
          break
        case "Bottom":
          measurementKeys = ["waist", "rise", "hem", "inseam", ...genericMeasurementKeys]
          break
      }
      measurementKeys.forEach(measurementKey => {
        const key = measurementKey === "totalcount" ? "total" : measurementKey
        variantData[key] = parseFloat(values[`${size}_${measurementKey}`])
      })
      // Loop through the seasonsUIDs and extract the data for the physical products
      // that belong to this variant.
      // The seasonsUID of the relevant appropriate physical product is in the format
      // {Product Variant SKU}-{index}
      const physicalProductsData = Object.keys(seasonsUIDToData)
        .map(seasonsUID => {
          if (seasonsUID.includes(sku)) {
            const { inventoryStatus, physicalProductStatus } = seasonsUIDToData[seasonsUID]
            return {
              seasonsUID,
              inventoryStatus,
              productStatus: physicalProductStatus,
            }
          } else {
            return null
          }
        })
        .filter(Boolean)
      variantData["physicalProducts"] = physicalProductsData
      return variantData
    })

    // Piece all the data together and perform mutation
    const productsData = {
      name,
      images,
      brandID,
      categoryID,
      type: productType,
      description,
      modelID,
      retailPrice: parseInt(retailPrice),
      modelSizeName,
      modelSizeDisplay,
      bottomSizeType,
      colorID,
      secondaryColorID,
      tags,
      functions,
      innerMaterials,
      outerMaterials,
      status,
      season,
      architecture,
      variants: variantsData,
    }
    const result = await upsertProduct({
      variables: {
        input: productsData,
      },
    })
    if (result?.data) {
      history.push("/inventory/products")
    }
  }

  const initialValues = {
    productType: "Top",
    retailPrice: 0,
    status: "NotAvailable",
  }

  return (
    <Box>
      <Wizard initialValues={initialValues} onNext={onNext} onSubmit={onSubmit}>
        <Overview data={data} />
        <Variants values={values} />
        <PhysicalProducts data={data} values={values} />
      </Wizard>
      <Spacer mt={9} />
    </Box>
  )
}
