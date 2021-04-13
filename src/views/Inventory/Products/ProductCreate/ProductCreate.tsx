import { Container } from "@material-ui/core"
import React, { useState } from "react"
import { Loading } from "@seasons/react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useHistory } from "react-router-dom"
import { ConfirmationDialog, Spacer, Wizard } from "components"
import { Overview, Variants } from "../Components"
import { PRODUCT_UPSERT_QUERY } from "../queries"
import { UPSERT_PRODUCT } from "../mutations"
import { getProductUpsertData } from "../utils"
import { useLocation } from "react-router"
import { ProductUpsertQuery } from "generated/ProductUpsertQuery"
import { PhysicalProductsCreate } from "views/Inventory/PhysicalProducts/PhysicalProductsCreate"
import { useSnackbarContext } from "components/Snackbar"

export const ProductCreate: React.FC = () => {
  const history = useHistory()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)
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

  const onCloseConfirmationDialog = async (agreed: boolean) => {
    // Make sure user has confirmed submission
    if (!agreed) {
      return
    }
    await onSubmit(values)
  }

  const onNext = async values => {
    console.log("onasd ae1", values)
    setValues(values)
    const { sizes } = values
    if (!sizes || sizes.length === 0) {
      setIsConfirmationDialogOpen(true)
      return false
    }
    return true
  }

  const onSubmit = async values => {
    setIsSubmitting(true)
    console.log("on submity asda", values)
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
        <Overview data={productUpsertQueryData} />
        <Variants createData={values} />
        <PhysicalProductsCreate
          newProductCreateData={values}
          inventoryStatuses={productUpsertQueryData.inventoryStatuses?.enumValues || []}
        />
      </Wizard>
      <Spacer mt={18} />
      <ConfirmationDialog
        title="By not specifying any available sizes, a new product will be created without any variants. Are you sure you want to submit?"
        body="Make sure all the values provided are correct before submitting."
        open={isConfirmationDialogOpen}
        setOpen={setIsConfirmationDialogOpen}
        onClose={onCloseConfirmationDialog}
      />
    </Container>
  )
}
