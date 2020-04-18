import { productCreateQuery } from "queries"
import { Box } from "@material-ui/core"
import React from "react"
import { useQuery } from "react-apollo"

import { Spacer, Wizard } from "components"
import { ProductCreateDetails, ProductCreateVariants, ProductCreatePhysicalProducts } from "./ProductCreateComponents"

export interface ProductCreateProps {
  history: any
  match: any
  props?: any
}

const REQUIRED = "*Required"

export interface ProductCreateDetailsError {
  brand?: string
  name?: string
  description?: string
  sizes?: string
  status?: string
  model?: string
  modelSize?: string
  productType?: string
  season?: string
  retailPrice?: string
  architecture?: string
  category?: string
  subCategory?: string
  color?: string
  secondaryColor?: string
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

  const validateDetails = values => {
    console.log("VALIDATE DETAILS", values)
    const errors: ProductCreateDetailsError = {}
    if (!values?.brand) {
      errors.brand = REQUIRED
    }
    if (!values?.name) {
      errors.name = REQUIRED
    }
    if (values?.name?.length > 50) {
      errors.name = "Max 50 characters"
    }
    if (!values?.description) {
      errors.description = REQUIRED
    }
    if (values?.description?.length > 140) {
      errors.description = "Max 140 characters"
    }
    if (!values?.sizes || values?.sizes?.length === 0) {
      errors.sizes = REQUIRED
    }
    if (!values?.status) {
      errors.status = REQUIRED
    }
    if (!values?.model) {
      errors.model = REQUIRED
    }
    if (!values?.modelSize) {
      errors.modelSize = REQUIRED
    }

    return errors
  }

  const validateVariants = values => {
    // TODO
    const errors = {}
    return errors
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
        <ProductCreateDetails data={data} validate={validateDetails} />
        <ProductCreateVariants variants={variants} validate={validateVariants} />
        <ProductCreatePhysicalProducts data={data} skus={skus} validate={validatePhysicalProducts} />
      </Wizard>
      <Spacer mt={9} />
    </Box>
  )
}
