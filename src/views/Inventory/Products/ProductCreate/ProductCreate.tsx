import { Box } from "@material-ui/core"
import React, { useState } from "react"
import { Loading } from "react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useHistory } from "react-router-dom"

import { BackButton, Spacer, Wizard } from "components"
import { Overview, Variants, PhysicalProducts } from "../Components"
import { PRODUCT_UPSERT_QUERY } from "../queries"
import { UPSERT_PRODUCT } from "../mutations"
import { getProductUpsertData } from "../utils"
import { ProductUpsertQuery } from "generated/ProductUpsertQuery"

export interface ProductCreateProps {}

export const ProductCreate = props => {
  const history = useHistory()
  const { data, loading } = useQuery(PRODUCT_UPSERT_QUERY)
  const [upsertProduct] = useMutation(UPSERT_PRODUCT)
  const [values, setValues] = useState({})

  if (loading || !data) {
    return <Loading />
  }
  console.log("DATA:", data)

  const onNext = values => {
    setValues(values)
  }

  const onSubmit = async values => {
    // Extract appropriate values from the WizardForm
    const productUpsertData = getProductUpsertData(values)
    try {
      const result = await upsertProduct({
        variables: {
          input: productUpsertData,
        },
      })
      if (result?.data) {
        history.push("/inventory/products")
      }
    } catch (e) {
      console.log("error:", e)
    }
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
      <Wizard initialValues={initialValues} onNext={onNext} onSubmit={onSubmit}>
        <Overview data={productUpsertQueryData} />
        <Variants createData={values} />
        <PhysicalProducts
          createData={values}
          inventoryStatuses={productUpsertQueryData.inventoryStatuses?.enumValues || []}
          physicalProductStatuses={productUpsertQueryData.physicalProductStatuses?.enumValues || []}
        />
      </Wizard>
      <Spacer mt={9} />
    </Box>
  )
}
