import { productCreateQuery } from "queries"
import { Box } from "@material-ui/core"
import React from "react"
import { useQuery } from "react-apollo"

import { Spacer, Wizard } from "components"
import { Overview, Variants, PhysicalProducts } from "../Components"
import { overviewValidationSchema } from "../Components/Overview"
import { validateProductCreateVariants } from "../utils"
import { validate } from "utils/form"

export interface ProductCreateProps {
  history: any
  match: any
  props?: any
}

export const ProductCreate = props => {
  const { data, loading, error } = useQuery(productCreateQuery)

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

  const validateOverview = async values => {
    return await validate(overviewValidationSchema, values)
  }

  const validatePhysicalProducts = values => {
    // TODO
    const errors = {}
    return errors
  }

  const initialValues = {
    productType: "Top",
    retailPrice: 0,
    status: "NotAvailable",
  }

  // TEMP: Mock data
  const variants = [
    { size: "Small", sku: "STIS-PNK-SS-015", type: "Top" },
    { size: "Medium", sku: "STIS-PNK-SS-015", type: "Bottom" },
    { size: "Large", sku: "STIS-PNK-SS-015", type: "Top" },
  ]
  const skus = ["STIS-PNK-SS-015", "STIS-PNK-SS-015", "STIS-PNK-SS-015"]

  return (
    <Box>
      <Wizard initialValues={initialValues} onSubmit={onSubmit}>
        <Overview data={data} validate={validateOverview} />
        <Variants variants={variants} validate={validateProductCreateVariants} />
        <PhysicalProducts data={data} skus={skus} validate={validatePhysicalProducts} />
      </Wizard>
      <Spacer mt={9} />
    </Box>
  )
}
