import React, { useEffect, useState } from "react"
import { Container } from "@material-ui/core"
import { Loading } from "@seasons/react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useParams } from "react-router-dom"
import { pick } from "lodash"
import { Spacer, Wizard } from "components"
import { ProductOverviewStep } from "../Components"
import { ProductEditQuery } from "generated/ProductEditQuery"
import { PRODUCT_EDIT_QUERY } from "../queries"
import { UPDATE_PRODUCT } from "../mutations"
import { getProductUpdateData } from "../utils"
import { useSnackbarContext } from "components/Snackbar"

export interface ProductEditProps {}

export const ProductEdit: React.FC<ProductEditProps> = props => {
  const { productID } = useParams() as any
  const [productType, setProductType] = useState("Top")
  const { data, error } = useQuery(PRODUCT_EDIT_QUERY, {
    variables: { input: { id: productID }, productType },
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

  const productEditData: ProductEditQuery = data
  const product = productEditData?.product

  useEffect(() => {
    if (product?.type) {
      setProductType(product.type)
    }
  }, [product, setProductType])

  if (error || !data || !product) {
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

  let initialValues

  if (product) {
    let initialStyles
    // @ts-ignore
    if (product?.styles?.length > 0) {
      initialStyles = product.styles
      // @ts-ignore
    } else if (product?.brand?.styles?.length > 0) {
      initialStyles = product.brand?.styles
    }
    const availableSizes = product.variants?.map(variant => {
      return variant?.internalSize?.display
    })

    // Extract current values of the product to display
    initialValues = {
      architecture: product.architecture,
      brand: {
        value: product.brand.id,
        label: product.brand.name,
      },
      recoupment: product.recoupment ? product.recoupment : product.category.recoupment,
      wholesalePrice: product.wholesalePrice,
      rentalPriceOverride: product.rentalPriceOverride,
      category: product.category.id,
      color: product.color.colorCode,
      functions: product.functions?.map(func => func.name),
      materialCategory: product.materialCategory?.slug,
      model: product.model?.id,
      modelSize: product.modelSize?.display,
      productType: product.type,
      secondaryColor: product.secondaryColor?.colorCode,
      sizes: availableSizes,
      styles: initialStyles,
      wearableSeasons: product.season?.wearableSeasons,
      tags: product.tags.map(tag => tag.name),
      productTier: product.tier.tier,
      vendorSeasonSeasonCode: product.season?.vendorSeason?.seasonCode,
      vendorSeasonYear: product.season?.vendorSeason?.year,
      internalSeasonSeasonCode: product.season?.internalSeason?.seasonCode,
      internalSeasonYear: product.season?.internalSeason?.year,
      buyUsedPrice: product.buyUsedPrice ? product.buyUsedPrice / 100 : 0,
      manufacturerSizeType: product?.variants?.[0]?.manufacturerSizes?.[0]?.type,
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
        <ProductOverviewStep
          data={data}
          product={data.product}
          productType={productType}
          setProductType={setProductType}
        />
      </Wizard>
      <Spacer mt={9} />
    </Container>
  )
}
