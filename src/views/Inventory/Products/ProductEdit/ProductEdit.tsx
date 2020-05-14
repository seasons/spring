import { Box } from "@material-ui/core"
import React, { useState } from "react"
import { Loading, useGetOne } from "react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useHistory, useParams } from "react-router-dom"
import { pick } from "lodash"

import { BackButton, Spacer, Wizard } from "components"
import { Overview } from "../Components"
import { PRODUCT_UPSERT_QUERY } from "../queries"

export interface ProductEditProps {
  history: any
  match: any
  props?: any
}

export const ProductEdit = props => {
  const history = useHistory()
  const { productID } = useParams()
  const { data, loading, error } = useGetOne("Product", productID)
  const { data: productUpsertData, loading: productUpsertLoading } = useQuery(PRODUCT_UPSERT_QUERY)

  if (
    loading ||
    !data ||
    productUpsertLoading ||
    !productUpsertData?.bottomSizes ||
    !productUpsertData?.bottomSizeTypes ||
    !productUpsertData?.brands ||
    !productUpsertData?.categories ||
    !productUpsertData?.colors ||
    !productUpsertData?.physicalProductStatuses ||
    !productUpsertData?.productArchitectures ||
    !productUpsertData?.productFunctions ||
    !productUpsertData?.productModels ||
    !productUpsertData?.productTypes ||
    !productUpsertData?.topSizes
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

  const availableSizes = data.variants.map(variant => {
    switch (data.type) {
      case "Top":
        return variant.internalSize.top.letter
      case "Bottom":
        return variant.internalSize.bottom.value
    }
  })

  const initialValues = {
    architecture: data.architecture?.id,
    brand: data.brand.id,
    category: data.category.id,
    color: data.color.id,
    functions: data.functions.map(func => func.name),
    model: data.model?.id,
    modelSize: data.modelSize.display,
    productType: data.type,
    secondaryColor: data.secondaryColor?.id,
    sizes: availableSizes,
    tags: data.tags.map(tag => tag.name),
    ...pick(data, ["description", "name", "innerMaterials", "outerMaterials", "retailPrice", "season", "status"]),
  }
  data.images.forEach((image, index) => {
    initialValues[`image_${index}`] = image.url
  })

  return (
    <Box mx={5}>
      <Spacer mt={5} />
      <BackButton title="Inventory" onClick={() => history.push("/inventory/products")} />
      <Wizard submitButtonTitle="Save" initialValues={initialValues} onNext={onNext} onSubmit={onSubmit}>
        <Overview productUpsertData={productUpsertData} productData={data} />
      </Wizard>
      <Spacer mt={9} />
    </Box>
  )
}
