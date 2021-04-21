import { Container } from "@material-ui/core"
import React, { useState } from "react"
import { Loading } from "@seasons/react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useHistory } from "react-router-dom"
import { Spacer, Wizard } from "components"
import { ProductOverviewStep } from "../Components"
import { PRODUCT_UPSERT_QUERY } from "../queries"
import { UPSERT_PRODUCT } from "../mutations"
import { getProductUpsertData } from "../utils"
import { useLocation } from "react-router"
import { ProductUpsertQuery } from "generated/ProductUpsertQuery"
import { useSnackbarContext } from "components/Snackbar"
import { PhysicalProductsCreate as PhysicalProductsCreateStep } from "views/Inventory/PhysicalProducts/PhysicalProductsCreate"
import { ProductVariantEditForm as ProductVariantEditFormStep } from "views/Inventory/ProductVariants"

export const ProductCreate: React.FC = () => {
  const history = useHistory()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data, loading, error } = useQuery(PRODUCT_UPSERT_QUERY)
  const location = useLocation()
  const { showSnackbar } = useSnackbarContext()
  const [upsertProduct] = useMutation(UPSERT_PRODUCT, {
    onCompleted: result => {
      setIsSubmitting(false)

      // Redirect to product edit page for this product
      const { upsertProduct } = result
      history.push(`/inventory/products/${upsertProduct.id}`)
      showSnackbar({
        message: "Success!",
        status: "success",
      })
    },
    onError: error => {
      showSnackbar({
        message: error?.message,
        status: "error",
      })
      setIsSubmitting(false)
    },
  })
  const [values, setValues] = useState({})

  if (loading || error || !data) {
    return <Loading />
  }

  const onNext = async values => {
    setValues({ ...values, brand: values.brand.value })
    return true
  }

  const onSubmit = async values => {
    setIsSubmitting(true)
    // Extract appropriate values from the WizardForm
    const productUpsertData = getProductUpsertData(values)
    productUpsertData.createNew = location.pathname.includes("new")
    await upsertProduct({
      variables: {
        input: productUpsertData,
      },
    })
  }

  const initialValues = {
    manufacturerSizeType: "Letter",
    productType: "Top",
    retailPrice: 0,
    status: "NotAvailable",
  }

  const productUpsertQueryData: ProductUpsertQuery = data

  return (
    <Container maxWidth={false}>
      <Wizard initialValues={initialValues} onNext={onNext} onSubmit={onSubmit} submitting={isSubmitting}>
        <ProductOverviewStep data={productUpsertQueryData} />
        <ProductVariantEditFormStep createData={values} />
        <PhysicalProductsCreateStep
          newProductCreateData={values}
          inventoryStatuses={productUpsertQueryData.inventoryStatuses?.enumValues || []}
        />
      </Wizard>
      <Spacer mt={18} />
    </Container>
  )
}
