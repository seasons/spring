import { Container } from "@material-ui/core"
import React, { useState } from "react"
import { Loading } from "@seasons/react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useHistory } from "react-router-dom"

import { Spacer, Wizard } from "components"
import { Overview, Variants, PhysicalProducts } from "../Components"
import { PRODUCT_UPSERT_QUERY } from "../queries"
import { UPSERT_PRODUCT } from "../mutations"
import { getProductUpsertData } from "../utils"
import { ProductUpsertQuery } from "generated/ProductUpsertQuery"

export interface ProductCreateProps {}

export const ProductCreate = props => {
  const history = useHistory()
  const { data, loading, error } = useQuery(PRODUCT_UPSERT_QUERY)
  const [upsertProduct] = useMutation(UPSERT_PRODUCT)
  const [values, setValues] = useState({})

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
      <Spacer mt={9} />
    </Container>
  )
}
