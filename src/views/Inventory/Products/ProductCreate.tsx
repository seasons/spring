import { productCreateQuery } from "queries"
import React from "react"
import { graphql } from "react-apollo"

import { Wizard } from "components"
import { ProductCreateDetails } from "./ProductCreateComponents"

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
    console.log("VALIDATING:", values)
    // TODO
    const errors = {}
    return errors
  }

  const initialValues = {
    productType: "Top",
    retailPrice: 0,
    status: "NotAvailable",
  }

  return (
    <Wizard initialValues={initialValues} onSubmit={onSubmit}>
      <ProductCreateDetails data={data} validate={validateDetails} />
    </Wizard>
  )
})
