import { Container } from "@material-ui/core"
import React, { useState } from "react"
import { Loading } from "@seasons/react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useHistory } from "react-router-dom"
import { Spacer, Wizard } from "components"
import { ProductOverviewStep } from "../Components"
import { PRODUCT_UPSERT_QUERY } from "../queries"
import { CREATE_PRODUCT } from "../mutations"
import { getProductCreateData } from "../utils"
import { ProductUpsertQuery } from "generated/ProductUpsertQuery"
import { useSnackbarContext } from "components/Snackbar"
import { PhysicalProductsCreate as PhysicalProductsCreateStep } from "views/Inventory/PhysicalProducts/PhysicalProductsCreate"
import { ProductVariantEditForm as ProductVariantEditFormStep } from "views/Inventory/ProductVariants"

export const ProductCreate: React.FC = () => {
  const history = useHistory()
  const [productType, setProductType] = useState("Top")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data, error } = useQuery(PRODUCT_UPSERT_QUERY, {
    variables: { productType },
  })
  const { showSnackbar } = useSnackbarContext()
  const [createProduct] = useMutation(CREATE_PRODUCT, {
    onCompleted: result => {
      setIsSubmitting(false)

      // Redirect to product edit page for this product
      const { createProduct } = result
      history.push(`/inventory/products/${createProduct.id}`)
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

  if (error || !data) {
    return <Loading />
  }

  const onSubmit = async values => {
    setIsSubmitting(true)
    // Extract appropriate values from the WizardForm
    const productCreateData = getProductCreateData(values)
    // productCreateData.createNew = location.pathname.includes("new")
    await createProduct({
      variables: {
        input: productCreateData,
      },
    })
  }

  const onNext = async values => {
    if (values.status === "Upcoming") {
      if (values.photographyStatus !== "Done") {
        showSnackbar({
          message: "Photography must be finished for upcoming products",
          status: "error",
        })
      } else {
        onSubmit(values)
      }
      return false
    } else {
      setValues({ ...values, brand: values.brand.value })
      return true
    }
  }

  const initialValues = {
    manufacturerSizeType: "Letter",
    productType: "Top",
    retailPrice: 0,
    recoupment: 4,
    wholesalePrice: 0,
    status: "NotAvailable",
  }

  const productUpsertQueryData: ProductUpsertQuery = data

  return (
    <Container maxWidth={false}>
      <Wizard initialValues={initialValues} onNext={onNext} onSubmit={onSubmit} submitting={isSubmitting}>
        <ProductOverviewStep data={productUpsertQueryData} productType={productType} setProductType={setProductType} />
        <ProductVariantEditFormStep createData={values} productCreateData={productUpsertQueryData} />
        <PhysicalProductsCreateStep
          newProductCreateData={values}
          inventoryStatuses={productUpsertQueryData.inventoryStatuses?.enumValues || []}
        />
      </Wizard>
      <Spacer mt={18} />
    </Container>
  )
}
