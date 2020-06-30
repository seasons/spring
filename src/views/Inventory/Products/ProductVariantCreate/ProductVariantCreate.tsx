import { Container } from "@material-ui/core"
import React, { useState } from "react"
import { Loading } from "@seasons/react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useHistory, useParams } from "react-router-dom"

import { ConfirmationDialog, Snackbar, Spacer, Wizard } from "components"
import { SnackbarState } from "components/Snackbar"
import { Overview, Variants, PhysicalProducts } from "../Components"
import { PRODUCT_UPSERT_QUERY } from "../queries"
import { UPSERT_PRODUCT } from "../mutations"
import { getProductUpsertData } from "../utils"
import { ProductUpsertQuery } from "generated/ProductUpsertQuery"

export interface ProductVariantCreateProps {}

export const ProductVariantCreate = props => {
  const history = useHistory()
  const { productID } = useParams()
  console.log("PRODUCT ID:", productID)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)
  const { data, loading, error } = useQuery(PRODUCT_UPSERT_QUERY)
  const [upsertProduct] = useMutation(UPSERT_PRODUCT, {
    onCompleted: result => {
      console.log("RESULT:", result)
      setIsSubmitting(false)

      // Redirect to product edit page for this product
      const { upsertProduct } = result
      history.push(`/inventory/products/${upsertProduct.id}`)
    },
    onError: error => {
      console.log("ERROR:", error)
      toggleSnackbar({
        show: true,
        message: error?.message,
        status: "error",
      })
      setIsSubmitting(false)
    },
  })
  const [values, setValues] = useState({})
  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })

  if (loading || error || !data) {
    return <Loading />
  }
  console.log("DATA:", data)

  const onCloseConfirmationDialog = async (agreed: boolean) => {
    // Make sure user has confirmed submission
    if (!agreed) {
      return
    }
    await onSubmit(values)
  }

  const onNext = async values => {
    setValues(values)
    const { sizes } = values
    console.log("SIZES:", sizes)
    if (!sizes || sizes.length === 0) {
      setIsConfirmationDialogOpen(true)
      return false
    }
    return true
  }

  const onSubmit = async values => {
    setIsSubmitting(true)
    // Extract appropriate values from the WizardForm
    const productUpsertData = getProductUpsertData(values)
    console.log("PRODUCT UPSERT:", productUpsertData)
    await upsertProduct({
      variables: {
        input: productUpsertData,
      },
    })
  }

  const initialValues = {
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
        <PhysicalProducts
          createData={values}
          inventoryStatuses={productUpsertQueryData.inventoryStatuses?.enumValues || []}
          physicalProductStatuses={productUpsertQueryData.physicalProductStatuses?.enumValues || []}
        />
      </Wizard>
      <Spacer mt={18} />
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
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
