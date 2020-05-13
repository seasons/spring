import { Box } from "@material-ui/core"
import React, { useState } from "react"
import { Loading, useGetOne } from "react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useHistory, useParams } from "react-router-dom"

import { BackButton, Spacer, Wizard } from "components"
import { Overview } from "../Components"
import { PRODUCT_UPSERT_QUERY } from "../queries"

export interface ProductEditProps {
  history: any
  match: any
  props?: any
}

export const ProductEdit = props => {
  const history = useHistory()
  const { productID } = useParams()
  const { data, loading, error } = useGetOne("Product", productID)
  const { data: productUpsertData, loading: productUpsertLoading } = useQuery(PRODUCT_UPSERT_QUERY)

  console.log("PROD ID", productID)
  console.log("PROD DATA:", data)
  if (error) {
    console.log("ERROR", error)
  }

  if (
    loading ||
    !data ||
    productUpsertLoading ||
    !productUpsertData?.bottomSizes ||
    !productUpsertData?.bottomSizeTypes ||
    !productUpsertData?.brands ||
    !productUpsertData?.categories ||
    !productUpsertData?.colors ||
    !productUpsertData?.physicalProductStatuses ||
    !productUpsertData?.productArchitectures ||
    !productUpsertData?.productFunctions ||
    !productUpsertData?.productModels ||
    !productUpsertData?.productTypes ||
    !productUpsertData?.topSizes
  ) {
    return <Loading />
  }
  console.log("DATA:", data)

  const onNext = values => {}

  const onSubmit = async values => {}

  const initialValues = {
    brand: data.brand.id,
    name: data.name,
    productType: data.type,
    retailPrice: data.retailPrice,
    status: data.status,
  }

  return (
    <Box mx={5}>
      <Spacer mt={5} />
      <BackButton title="Inventory" onClick={() => history.push("/inventory/products")} />
      <Wizard initialValues={initialValues} onNext={onNext} onSubmit={onSubmit}>
        <Overview data={productUpsertData} />
      </Wizard>
      <Spacer mt={9} />
    </Box>
  )
}
