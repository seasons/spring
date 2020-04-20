import { productCreateQuery } from "queries"
import { Box } from "@material-ui/core"
import React from "react"
import { Form, Field } from "react-final-form"
import { useQuery } from "react-apollo"

import { Spacer, Wizard } from "components"
import { Overview, Variants, PhysicalProducts } from "../Components"
import { validateProductCreateDetails, validateProductCreateVariants } from "../utils"
import SelectInput from "@material-ui/core/Select/SelectInput"

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

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  const test = async () => {
    await sleep(100)
    return { username: "ASYNC" }
  }

  return (
    <Box>
      <Form
        onSubmit={() => {}}
        validate={values => {
          return test()
          // return { username: "REQ" }
        }}
      >
        {({ handleSubmit, submitting, values: formValues, errors }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Field name="username">
                {({ input, meta }) => (
                  <div>
                    <label>Username</label>
                    <input {...input} type="text" placeholder="Username" />
                    {meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </form>
          )
        }}
      </Form>
      {/* <Wizard initialValues={initialValues} onSubmit={onSubmit}>
        <Overview data={data} validate={validateProductCreateDetails} />
        <Variants variants={variants} validate={validateProductCreateVariants} />
        <PhysicalProducts data={data} skus={skus} validate={validatePhysicalProducts} />
      </Wizard> */}
      <Spacer mt={9} />
    </Box>
  )
}
