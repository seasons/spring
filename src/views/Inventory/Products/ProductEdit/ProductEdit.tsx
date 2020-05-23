import { Box } from "@material-ui/core"
import React from "react"
import { Loading } from "react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useHistory, useParams } from "react-router-dom"
import { pick } from "lodash"

import { BackButton, Spacer, Wizard } from "components"
import { Overview } from "../Components"
import { ProductEditQuery } from "generated/ProductEditQuery"
import { PRODUCT_EDIT_QUERY } from "../queries"
import { UPDATE_PRODUCT } from "../mutations"
import { getProductUpdateData } from "../utils"

export interface ProductEditProps {}

export const ProductEdit: React.FC<ProductEditProps> = props => {
  const history = useHistory()
  const { productID } = useParams()
  const { data, loading, error } = useQuery(PRODUCT_EDIT_QUERY, {
    variables: { input: { id: productID } },
  })
  const [updateProduct] = useMutation(UPDATE_PRODUCT)

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
      category: product.category.id,
      color: product.color.id,
      functions: product.functions?.map(func => func.name),
      model: product.model?.id,
      modelSize: product.modelSize?.display,
      productType: product.type,
      secondaryColor: product.secondaryColor?.id,
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
    <Box mx={5}>
      <Spacer mt={5} />
      <BackButton title="Inventory" onClick={() => history.push("/inventory/products")} />
      <Wizard submitButtonTitle="Save" initialValues={initialValues} onSubmit={onSubmit}>
        <Overview data={data} product={data.product} />
      </Wizard>
      <Spacer mt={9} />
    </Box>
  )
}
