import { productCreateQuery } from "queries"
import { Box } from "@material-ui/core"
import React from "react"
import { graphql } from "react-apollo"

import { Spacer, Wizard } from "components"
import { ProductCreateDetails, ProductCreateVariants } from "./ProductCreateComponents"

export interface ProductCreateProps {
  history: any
  match: any
  props?: any
}

export const ProductCreate = graphql(productCreateQuery)(props => {
  const data: any = props?.data

  const onSubmit = values => {
    console.log("SUBMITTED VALUES FINAL:", values)
  }

  const validateDetails = values => {
    // console.log("VALIDATING:", values)
    // TODO
    const errors = {}
    return errors
  }

  const validateVariants = values => {
    const errors = {}
    return errors
  }

  const initialValues = {
    productType: "Top",
    retailPrice: 0,
    status: "NotAvailable",
  }

  const variants = [
    { size: "Small", sku: "STIS-PNK-SS-015", type: "Top" },
    { size: "Medium", sku: "STIS-PNK-SS-015", type: "Top" },
    { size: "Large", sku: "STIS-PNK-SS-015", type: "Top" },
  ]

  return (
    <Box>
      <Wizard initialValues={initialValues} onSubmit={onSubmit}>
        <ProductCreateDetails data={data} validate={validateDetails} />
        <ProductCreateVariants variants={variants} validate={validateVariants} />
      </Wizard>
      <Spacer mt={9} />
    </Box>
  )
})
