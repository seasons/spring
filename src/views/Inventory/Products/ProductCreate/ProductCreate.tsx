import { Container } from "@material-ui/core"
import React, { useState } from "react"
import { Loading } from "@seasons/react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useHistory } from "react-router-dom"

import { Snackbar, Spacer, Wizard } from "components"
import { SnackbarState } from "components/Snackbar"
import { Overview, Variants, PhysicalProducts } from "../Components"
import { PRODUCT_UPSERT_QUERY } from "../queries"
import { UPSERT_PRODUCT } from "../mutations"
import { getProductUpsertData } from "../utils"
import { ProductUpsertQuery } from "generated/ProductUpsertQuery"

export interface ProductCreateProps {}

export const ProductCreate = props => {
  const history = useHistory()
  const { data, loading, error } = useQuery(PRODUCT_UPSERT_QUERY)
  const [upsertProduct] = useMutation(UPSERT_PRODUCT, {
    onCompleted: result => {
      // Redirect to product edit page for this product
      const { upsertProduct } = result
      history.push(`/inventory/products/${upsertProduct.id}`)
    },
    onError: error => {
      toggleSnackbar({
        show: true,
        message: error?.message,
        status: "error",
      })
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

  const onNext = values => {
    setValues(values)
  }

  const onSubmit = async values => {
    // Extract appropriate values from the WizardForm
    const productUpsertData = getProductUpsertData(values)
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
      <Wizard initialValues={initialValues} onNext={onNext} onSubmit={onSubmit}>
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
    </Container>
  )
}
