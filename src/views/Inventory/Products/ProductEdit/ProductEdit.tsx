import { Box } from "@material-ui/core"
import React from "react"
import { Loading } from "react-admin"
import { useQuery } from "react-apollo"
import { useHistory, useParams } from "react-router-dom"
import { pick } from "lodash"

import { BackButton, Spacer, Wizard } from "components"
import { Overview } from "../Components"
import { PRODUCT_EDIT_QUERY } from "../queries"

export interface ProductEditProps {
  history: any
  match: any
  props?: any
}

export const ProductEdit = props => {
  const history = useHistory()
  const { productID } = useParams()
  const { data, loading, error } = useQuery(PRODUCT_EDIT_QUERY, {
    variables: { input: { id: productID } },
  })

  console.log("DATA:", data)

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
