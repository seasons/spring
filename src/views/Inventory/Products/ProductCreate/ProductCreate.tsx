import { Box } from "@material-ui/core"
import React from "react"
import { useQuery, useMutation } from "react-apollo"

import { Spacer, Wizard } from "components"
import { Overview, Variants, PhysicalProducts } from "../Components"
import { PRODUCT_CREATE_QUERY } from "../queries"
import { UPLOAD_FILE } from "../mutations"

export interface ProductCreateProps {
  history: any
  match: any
  props?: any
}

export const ProductCreate = props => {
  const { data, loading } = useQuery(PRODUCT_CREATE_QUERY)
  const [uploadFile] = useMutation(UPLOAD_FILE)

  if (
    loading ||
    !data?.bottomSizes ||
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

  const onSubmit = async values => {
    console.log("SUBMITTED VALUES FINAL:", values)
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
    const numImages = 4
    const images = [...Array(numImages)].map(index => {
      return values[`image_${index}`]
    })
    let modelSizeDisplay
    switch (productType) {
      case "Top":
        modelSizeDisplay = modelSizeName
        break
      case "Bottom":
        modelSizeDisplay = bottomSizeType === "Letter" ? modelSizeName : `${bottomSizeType} ${modelSizeName}`
    }
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
    const physicalProductsData = Object.keys(skusToSizes).map(sku => {
      const physicalProductKeys = ["inventoryStatus"]
    })
    const variantsData = Object.entries(skusToSizes).map(entry => {
      const sku = entry[0]
      const size = entry[1]
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
      return variantData
    })
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
    // const imageFile = values["image_0"]
    // console.log("UPLOADING:", imageFile)
    // const result = await uploadFile({
    //   variables: {
    //     image: imageFile,
    //   },
    // })
    // console.log("RESULT:", result)
  }

  const initialValues = {
    productType: "Top",
    retailPrice: 0,
    status: "NotAvailable",
  }

  return (
    <Box>
      <Wizard initialValues={initialValues} onSubmit={onSubmit}>
        <Overview data={data} />
        <Variants />
        <PhysicalProducts data={data} />
      </Wizard>
      <Spacer mt={9} />
    </Box>
  )
}
