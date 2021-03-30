import React from "react"
import { Container } from "@material-ui/core"
import { Loading } from "@seasons/react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useParams } from "react-router-dom"
import { pick } from "lodash"
import { Spacer, Wizard } from "components"
import { Overview } from "../Components"
import { ProductEditQuery } from "generated/ProductEditQuery"
import { PRODUCT_EDIT_QUERY } from "../queries"
import { UPDATE_PRODUCT } from "../mutations"
import { getProductUpdateData } from "../utils"
import { useSnackbarContext } from "components/Snackbar"

export interface ProductEditProps {}

export const ProductEdit: React.FC<ProductEditProps> = props => {
  const { productID } = useParams() as any
  const { data, loading, error } = useQuery(PRODUCT_EDIT_QUERY, {
    variables: { input: { id: productID } },
  })
  const { showSnackbar } = useSnackbarContext()
  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    onError: error => {
      showSnackbar({
        message: error?.message,
        status: "error",
      })
    },
    onCompleted: data => {
      showSnackbar({
        message: "Product updated!",
        status: "success",
      })
    },
  })

  if (loading || error || !data) {
    return <Loading />
  }

  const onSubmit = async values => {
    const updateProductData = getProductUpdateData(values)
    await updateProduct({
      variables: {
        where: { id: productID },
        data: updateProductData,
      },
    })
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
      materialCategory: product.materialCategory?.slug,
      model: product.model?.id,
      modelSize: product.modelSize?.display,
      productType: product.type,
      secondaryColor: product.secondaryColor?.colorCode,
      sizes: availableSizes,
      wearableSeasons: product.season?.wearableSeasons,
      tags: product.tags.map(tag => tag.name),
      productTier: product.tier.tier,
      vendorSeasonSeasonCode: product.season?.vendorSeason?.seasonCode,
      vendorSeasonYear: product.season?.vendorSeason?.year,
      internalSeasonSeasonCode: product.season?.internalSeason?.seasonCode,
      internalSeasonYear: product.season?.internalSeason?.year,
      buyUsedPrice: product.buyUsedPrice ? product.buyUsedPrice / 100 : 0,
      ...pick(product, [
        "description",
        "externalURL",
        "name",
        "productFit",
        "innerMaterials",
        "outerMaterials",
        "retailPrice",
        "status",
        "photographyStatus",
        "buyNewEnabled",
        "buyUsedEnabled",
      ]),
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
        <Overview data={data} product={data.product} />
      </Wizard>
      <Spacer mt={9} />
    </Container>
  )
}
