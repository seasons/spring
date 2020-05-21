import { Box } from "@material-ui/core"
import React from "react"
import { Loading } from "react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useHistory, useParams } from "react-router-dom"

import { BackButton, Spacer, Wizard } from "components"
import { Variants } from "../Components"
import { VARIANT_EDIT_QUERY } from "../queries"
import { UPDATE_VARIANT } from "../mutations"
import { extractVariantSizeFields } from "../utils"

export interface VariantEditProps {}

export const VariantEdit: React.FC<VariantEditProps> = props => {
  const history = useHistory()
  const { variantID } = useParams()
  const { data, loading, error } = useQuery(VARIANT_EDIT_QUERY, {
    variables: { where: { id: variantID } },
  })
  const [updateVariant] = useMutation(UPDATE_VARIANT)

  if (loading || !data) {
    return <Loading />
  }
  console.log("DATA:", data)

  let initialValues = {}
  const { productVariant } = data
  const { id, internalSize, product, total, weight } = productVariant
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

  const onSubmit = async values => {
    if (!internalSize?.productType || !internalSize?.display) {
      return
    }
    const variantSizeData = extractVariantSizeFields({
      isEdit: true,
      productType: internalSize.productType,
      size: internalSize.display,
      values,
    })
    const updateVariantData = {
      id,
      productType: internalSize.productType,
      ...variantSizeData,
    }
    const result = await updateVariant({
      variables: { input: updateVariantData },
    })
    if (result?.data) {
      history.push(`/inventory/products/${product.id}`)
    }
  }

  return (
    <Box mx={5}>
      <Spacer mt={5} />
      <BackButton title={product.name} onClick={() => history.push(`/inventory/products/${product.id}`)} />
      <Wizard submitButtonTitle="Save" initialValues={initialValues} onSubmit={onSubmit}>
        <Variants variants={[productVariant]} />
      </Wizard>
      <Spacer mt={9} />
    </Box>
  )
}
