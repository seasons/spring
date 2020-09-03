import { Container } from "@material-ui/core"
import React, { useState } from "react"
import { Loading } from "@seasons/react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useHistory, useParams } from "react-router-dom"
import { Snackbar, Spacer, Wizard } from "components"
import { SnackbarState } from "components/Snackbar"
import { VariantsCreate } from "./Components"
import { useRefresh } from "@seasons/react-admin"
import { PRODUCT_VARIANT_UPSERT_QUERY } from "../queries"
import { UPSERT_VARIANTS } from "../mutations"
import { getProductVariantUpsertData } from "../utils"
import { ProductVariantUpsertQuery } from "generated/ProductVariantUpsertQuery"
import { PhysicalProductsCreate } from "views/Inventory/PhysicalProducts/PhysicalProductsCreate"

export const ProductVariantCreate: React.FC = () => {
  const history = useHistory()
  const refresh = useRefresh()
  const { productID } = useParams()
  const [values, setValues] = useState({})
  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [upsertVariants] = useMutation(UPSERT_VARIANTS, {
    onCompleted: () => {
      setIsSubmitting(false)
      // Redirect to product edit page for this product
      refresh()
      history.push(`/inventory/products/${productID}`)
    },
    onError: error => {
      toggleSnackbar({
        show: true,
        message: error?.message,
        status: "error",
      })
      setIsSubmitting(false)
    },
  })
  const { data, loading, error } = useQuery(PRODUCT_VARIANT_UPSERT_QUERY, {
    variables: { input: { id: productID } },
  })

  if (loading || error || !data) {
    return <Loading />
  }

  const productVariantUpsertQueryData: ProductVariantUpsertQuery = data
  const { bottomSizes, inventoryStatuses, physicalProductStatuses, product } = productVariantUpsertQueryData

  if (!product) {
    return null
  }

  const onNext = async values => {
    setValues(values)
    return true
  }

  const onSubmit = async values => {
    const variantUpsertData = getProductVariantUpsertData({
      values,
      productType: product.type,
    })
    await upsertVariants({
      variables: {
        productID: product.id,
        inputs: variantUpsertData,
      },
    })
  }

  const initialValues = {}

  return (
    <Container maxWidth={false}>
      <Wizard initialValues={initialValues} onNext={onNext} onSubmit={onSubmit} submitting={isSubmitting}>
        <VariantsCreate product={product} bottomSizes={bottomSizes} />
        <PhysicalProductsCreate
          newVariantsCreateData={{ product, values }}
          inventoryStatuses={inventoryStatuses?.enumValues || []}
        />
      </Wizard>
      <Spacer mt={18} />
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </Container>
  )
}
