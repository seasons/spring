import React, { useState } from "react"
import { Container } from "@material-ui/core"
import { Loading } from "@seasons/react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useHistory, useParams } from "react-router-dom"
import { pick } from "lodash"

import { Snackbar, Spacer, Wizard } from "components"
import { SnackbarState } from "components/Snackbar"
import { Overview } from "../Components"
import { ProductEditQuery } from "generated/ProductEditQuery"
import { PRODUCT_EDIT_QUERY } from "../queries"
import { UPDATE_PRODUCT } from "../mutations"
import { getProductUpdateData } from "../utils"

export interface ProductEditProps {}

export const ProductEdit: React.FC<ProductEditProps> = props => {
  const history = useHistory()
  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })
  const { productID } = useParams()
  const { data, loading, error } = useQuery(PRODUCT_EDIT_QUERY, {
    variables: { input: { id: productID } },
  })
  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    onError: error => {
      toggleSnackbar({
        show: true,
        message: error?.message,
        status: "error",
      })
    },
  })

  if (loading || error || !data) {
    return <Loading />
  }

  const onSubmit = async values => {
    const updateProductData = getProductUpdateData(values)
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

  const productEditData: ProductEditQuery = data
  const { product } = productEditData
  let initialValues

  if (product) {
    const availableSizes = product.variants?.map(variant => {
      switch (product.type) {
        case "Top":
          return variant?.internalSize?.top?.letter
        case "Bottom":
          return variant?.internalSize?.bottom?.value
      }
    })

    // Extract current values of the product to display
    initialValues = {
      architecture: product.architecture,
      brand: product.brand.id,
      category: product.category.name,
      color: product.color.colorCode,
      functions: product.functions?.map(func => func.name),
      model: product.model?.id,
      modelSize: product.modelSize?.display,
      productType: product.type,
      secondaryColor: product.secondaryColor?.colorCode,
      sizes: availableSizes,
      tags: product.tags.map(tag => tag.name),
      ...pick(product, ["description", "name", "innerMaterials", "outerMaterials", "retailPrice", "season", "status"]),
    }
    product.images.forEach((image, index) => {
      initialValues[`image_${index}`] = image.url
    })
  } else {
    initialValues = {}
  }

  return (
    <Container maxWidth={false}>
      <Wizard submitButtonTitle="Save" initialValues={initialValues} onSubmit={onSubmit}>
        <Overview data={data} product={data.product} toggleSnackbar={toggleSnackbar} />
      </Wizard>
      <Spacer mt={9} />
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </Container>
  )
}
