import { Box } from "@material-ui/core"
import React from "react"
import { Loading } from "react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useHistory, useParams } from "react-router-dom"
import { pick } from "lodash"

import { BackButton, Spacer, Wizard } from "components"
import { Overview, Variants } from "../Components"
import { VARIANT_EDIT_QUERY } from "../queries"
import { UPDATE_PRODUCT } from "../mutations"
import { getModelSizeDisplay } from "../utils"

export interface VariantEditProps {}

export const VariantEdit: React.FC<VariantEditProps> = props => {
  const history = useHistory()
  const { variantID } = useParams()
  const { data, loading, error } = useQuery(VARIANT_EDIT_QUERY, {
    variables: { where: { id: variantID } },
  })
  console.log("VAR ID", variantID)
  const [updateProduct] = useMutation(UPDATE_PRODUCT)

  if (error) {
    console.log("ERR", error)
  }

  if (loading || !data) {
    return <Loading />
  }
  console.log("DATA:", data)

  const onNext = values => {
    console.log("ON NEXT", values)
  }

  const onSubmit = async values => {
    console.log("SUBMIT VALS", values)
  }

  let initialValues = {}
  const { productVariant } = data
  const { sku, internalSize, total, weight } = productVariant
  if (internalSize) {
    const size = internalSize?.display
    switch (internalSize.productType) {
      case "Top":
        const { top } = internalSize
        initialValues = {
          [`${size}_chest`]: parseFloat(top?.chest) || undefined,
          [`${size}_length`]: parseFloat(top?.length) || undefined,
          [`${size}_neck`]: parseFloat(top?.neck) || undefined,
          [`${size}_shoulder`]: parseFloat(top?.shoulder) || undefined,
          [`${size}_sleeve`]: parseFloat(top?.sleeve) || undefined,
          [`${size}_totalcount`]: total,
          [`${size}_weight`]: parseFloat(weight) || undefined,
        }
        console.log("TOP", top)
        break
      case "Bottom":
        const { bottom } = internalSize
        initialValues = {
          [`${size}_waist`]: parseFloat(bottom?.waist) || undefined,
          [`${size}_rise`]: parseFloat(bottom?.rise) || undefined,
          [`${size}_hem`]: parseFloat(bottom?.hem) || undefined,
          [`${size}_inseam`]: parseFloat(bottom?.inseam) || undefined,
          [`${size}_totalcount`]: total,
          [`${size}_weight`]: parseFloat(weight) || undefined,
        }
        break
      default:
        break
    }
  }
  console.log("INITIAL", initialValues)

  return (
    <Box mx={5}>
      <Spacer mt={5} />
      <BackButton title="Inventory" onClick={() => history.push("/inventory/products")} />
      <Wizard submitButtonTitle="Save" initialValues={initialValues} onNext={onNext} onSubmit={onSubmit}>
        <Variants variants={[productVariant]} />
      </Wizard>
      <Spacer mt={9} />
    </Box>
  )
}
