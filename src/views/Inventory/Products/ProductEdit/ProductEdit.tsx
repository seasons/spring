import { Box } from "@material-ui/core"
import React from "react"
import { Loading } from "react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useHistory, useParams } from "react-router-dom"
import { pick } from "lodash"

import { BackButton, Spacer, Wizard } from "components"
import { Overview } from "../Components"
import { PRODUCT_EDIT_QUERY } from "../queries"
import { UPDATE_PRODUCT } from "../mutations"
import { getModelSizeDisplay } from "../utils"

export interface ProductEditProps {}

export const ProductEdit: React.FC<ProductEditProps> = props => {
  const history = useHistory()
  const { productID } = useParams()
  const { data, loading, error } = useQuery(PRODUCT_EDIT_QUERY, {
    variables: { input: { id: productID } },
  })
  const [updateProduct] = useMutation(UPDATE_PRODUCT)

  if (
    loading ||
    !data?.product ||
    !data?.bottomSizes ||
    !data?.bottomSizeTypes ||
    !data?.brands ||
    !data?.categories ||
    !data?.colors ||
    !data?.physicalProductStatuses ||
    !data?.productArchitectures ||
    !data?.productFunctions ||
    !data?.productModels ||
    !data?.productTypes ||
    !data?.topSizes
  ) {
    return <Loading />
  }
  console.log("DATA:", data)

  const onNext = values => {
    console.log("ON NEXT", values)
  }

  const onSubmit = async values => {
    console.log("SUBMIT VALS", values)
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
      status,
      subCategory: subCategoryID,
      tags,
    } = values

    const modelSizeDisplay = modelSizeName ? getModelSizeDisplay(productType, modelSizeName, bottomSizeType) : null
    const numImages = 4
    const images = [...Array(numImages).keys()]
      .map(index => {
        return values[`image_${index}`]
      })
      .filter(Boolean)

    const updateProductData = {
      architecture,
      bottomSizeType,
      brand: { connect: { id: brandID } },
      category: { connect: { id: categoryID } },
      color: { connect: { id: colorID } },
      description,
      functions,
      images,
      innerMaterials: { set: innerMaterials },
      model: modelID && { connect: { id: modelID } },
      modelSizeDisplay,
      modelSizeName,
      name,
      outerMaterials: { set: outerMaterials },
      retailPrice,
      season,
      secondaryColor: secondaryColorID && { connect: { id: secondaryColorID } },
      status,
      tags,
      type: productType,
    }
    const result = await updateProduct({
      variables: {
        where: { id: productID },
        data: updateProductData,
      },
    })
    if (result?.data) {
      history.push("/inventory/products")
    }
  }

  const { product } = data
  const availableSizes = product.variants.map(variant => {
    switch (product.type) {
      case "Top":
        return variant.internalSize.top.letter
      case "Bottom":
        return variant.internalSize.bottom.value
    }
  })

  // Extract current values of the product to display
  const initialValues = {
    architecture: product.architecture?.id,
    brand: product.brand.id,
    category: product.category.id,
    color: product.color.id,
    functions: product.functions.map(func => func.name),
    model: product.model?.id,
    modelSize: product.modelSize.display,
    productType: product.type,
    secondaryColor: product.secondaryColor?.id,
    sizes: availableSizes,
    tags: product.tags.map(tag => tag.name),
    ...pick(product, ["description", "name", "innerMaterials", "outerMaterials", "retailPrice", "season", "status"]),
  }
  product.images.forEach((image, index) => {
    initialValues[`image_${index}`] = image.url
  })

  return (
    <Box mx={5}>
      <Spacer mt={5} />
      <BackButton title="Inventory" onClick={() => history.push("/inventory/products")} />
      <Wizard submitButtonTitle="Save" initialValues={initialValues} onNext={onNext} onSubmit={onSubmit}>
        <Overview data={data} />
      </Wizard>
      <Spacer mt={9} />
    </Box>
  )
}