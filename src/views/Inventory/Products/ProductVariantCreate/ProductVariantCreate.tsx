import { Container } from "@material-ui/core"
import React, { useState } from "react"
import { Loading } from "@seasons/react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useHistory, useParams } from "react-router-dom"
import { Spacer, Wizard } from "components"
import { VariantsCreate } from "./Components"
import { useRefresh } from "@seasons/react-admin"
import { PRODUCT_EDIT_QUERY, PRODUCT_VARIANT_UPSERT_QUERY } from "../queries"
import { UPSERT_VARIANTS } from "../mutations"
import { getProductVariantUpsertData } from "../utils"
import { ProductVariantUpsertQuery } from "generated/ProductVariantUpsertQuery"
import { PhysicalProductsCreate } from "views/Inventory/PhysicalProducts/PhysicalProductsCreate"
import { useSnackbarContext } from "components/Snackbar"

export const ProductVariantCreate: React.FC = () => {
  const history = useHistory()
  const refresh = useRefresh()
  const { productID } = useParams() as any
  const [values, setValues] = useState({})

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { showSnackbar } = useSnackbarContext()
  const [upsertVariants] = useMutation(UPSERT_VARIANTS, {
    onCompleted: () => {
      setIsSubmitting(false)
      // Redirect to product edit page for this product
      refresh()
      history.push(`/inventory/products/${productID}`)
    },
    onError: error => {
      showSnackbar({
        message: error?.message,
        status: "error",
      })
      setIsSubmitting(false)
    },
    refetchQueries: [
      {
        query: PRODUCT_EDIT_QUERY,
        variables: { input: { id: productID } },
      },
    ],
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
        productID: product.slug,
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
    </Container>
  )
}
