import { Box } from "@material-ui/core"
import React from "react"
import { useQuery } from "react-apollo"

import { Spacer, Wizard } from "components"
import { Overview, Variants, PhysicalProducts } from "../Components"
import { overviewValidationSchema } from "../Components/Overview"
import { getVariantsValidationSchema } from "../Components/Variants"
import { getPhysicalProductsValidationSchema } from "../Components/PhysicalProducts"
import { PRODUCT_CREATE_QUERY } from "../queries"
import { validate } from "utils/form"

export interface ProductCreateProps {
  history: any
  match: any
  props?: any
}

export const ProductCreate = props => {
  const { data, loading } = useQuery(PRODUCT_CREATE_QUERY)

  if (
    loading ||
    !data?.bottomSizes ||
    !data?.brands ||
    !data?.categories ||
    !data?.colors ||
    !data?.materials ||
    !data?.physicalProductStatuses ||
    !data?.products ||
    !data?.productArchitectures ||
    !data?.productFunctions ||
    !data?.productModels ||
    !data?.productTypes ||
    !data?.topSizes
  ) {
    return <div>Loading</div>
  }

  const onSubmit = values => {
    console.log("SUBMITTED VALUES FINAL:", values)
  }

  const initialValues = {
    productType: "Top",
    retailPrice: 0,
    status: "NotAvailable",
  }

  return (
    <Box>
      <Wizard initialValues={initialValues} onSubmit={onSubmit}>
        <Overview data={data} />
        <Variants />
        <PhysicalProducts data={data} />
      </Wizard>
      <Spacer mt={9} />
    </Box>
  )
}
