import { Box } from "@material-ui/core"
import React, { useState } from "react"
import { Loading } from "react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useHistory } from "react-router-dom"

import { BackButton, ConfirmationDialog, Spacer, Wizard } from "components"
import { Overview, Variants, PhysicalProducts } from "../Components"
import { PRODUCT_UPSERT_QUERY } from "../queries"
import { UPSERT_PRODUCT } from "../mutations"
import { getModelSizeDisplay, extractVariantSizeFields, getProductUpsertData } from "../utils"
import { ProductUpsertQuery } from "generated/ProductUpsertQuery"

export interface ProductCreateProps {}

export const ProductCreate = props => {
  const history = useHistory()
  const { data, loading } = useQuery(PRODUCT_UPSERT_QUERY)
  const [upsertProduct] = useMutation(UPSERT_PRODUCT)
  const [values, setValues] = useState({})
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (loading || !data) {
    return <Loading />
  }
  console.log("DATA:", data)

  const onNext = values => {
    setValues(values)
  }

  const onSubmit = async values => {
    setValues(values)

    // Prevent user from submitting multiple times
    if (!isSubmitting) {
      setIsConfirmationDialogOpen(true)
    }
  }

  const onCloseConfirmationDialog = async (agreed: boolean) => {
    console.log("SUBMITTED VALUES FINAL:", values)
    // Make sure user has confirmed submission
    if (!agreed) {
      return
    }
    setIsSubmitting(true)
    console.log("UPSERTING")
    // Extract appropriate values from the WizardForm
    // const productUpsertData = getProductUpsertData(values)
    // const result = await upsertProduct({
    //   variables: {
    //     input: productUpsertData,
    //   },
    // })
    // if (result?.data) {
    //   history.push("/inventory/products")
    // }
  }

  const initialValues = {
    productType: "Top",
    retailPrice: 0,
    status: "NotAvailable",
  }

  const productUpsertQueryData: ProductUpsertQuery = data

  return (
    <Box mx={5}>
      <Spacer mt={5} />
      <BackButton title="Inventory" onClick={() => history.push("/inventory/products")} />
      <Wizard initialValues={initialValues} onNext={onNext} onSubmit={onSubmit} isSubmitting={isSubmitting}>
        <Overview data={productUpsertQueryData} />
        <Variants createData={values} />
        <PhysicalProducts
          createData={values}
          inventoryStatuses={productUpsertQueryData.inventoryStatuses?.enumValues || []}
          physicalProductStatuses={productUpsertQueryData.physicalProductStatuses?.enumValues || []}
        />
      </Wizard>
      <Spacer mt={9} />
      <ConfirmationDialog
        title="Are you sure you want to submit?"
        body="Make sure all the values provided are correct before submitting."
        open={isConfirmationDialogOpen}
        setOpen={setIsConfirmationDialogOpen}
        onClose={onCloseConfirmationDialog}
      />
    </Box>
  )
}
