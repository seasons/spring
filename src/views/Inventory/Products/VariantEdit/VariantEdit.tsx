import React from "react"
import { Container } from "@material-ui/core"
import { Loading } from "@seasons/react-admin"
import { useQuery, useMutation } from "react-apollo"
import { useHistory, useParams } from "react-router-dom"
import { omit } from "lodash"
import { Spacer, Wizard } from "components"
import { Variants } from "../Components"
import { VARIANT_EDIT_QUERY } from "../queries"
import { UPDATE_VARIANT } from "../mutations"
import { extractVariantSizeFields } from "../utils"

export const VariantEdit: React.FC = () => {
  const history = useHistory()
  const { variantID } = useParams() as any
  const { data, loading, error, refetch } = useQuery(VARIANT_EDIT_QUERY, {
    variables: { where: { id: variantID } },
  })
  const [updateProductVariant] = useMutation(UPDATE_VARIANT)

  if (loading || error || !data) {
    return <Loading />
  }

  let initialValues = {} as any
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
        if (!!productVariant.manufacturerSizes.length) {
          const types: any[] = []
          productVariant.manufacturerSizes.forEach(size => {
            const type = size.bottom?.type
            initialValues["manufacturerBottomSizeType"] = type
            const sizeType = size.display.split(" ")
            !!sizeType && types.push(sizeType?.[0])
            initialValues[`${internalSize.display}_manufacturerSize_${type}`] = size.display
          })
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
      productType: internalSize.productType,
      size: internalSize.display,
      values,
    })
    const cleanedVariantData = omit(variantSizeData, ["total"])
    const shopifyExternalID = values[`${internalSize.display}_shopifyProductVariant`]?.externalID
    const updateVariantData = {
      id,
      productType: internalSize.productType,
      ...cleanedVariantData,
    }
    if (shopifyExternalID) {
      updateVariantData["shopifyProductVariant"].externalId = shopifyExternalID
    }
    const result = await updateProductVariant({
      variables: { input: updateVariantData },
    })
    if (result?.data) {
      history.push(`/inventory/products/${product.id}`)
    }
  }

  return (
    <Container maxWidth={false}>
      <Wizard submitButtonTitle="Save" initialValues={initialValues} onSubmit={onSubmit}>
        <Variants variants={[productVariant]} refetch={refetch} />
      </Wizard>
      <Spacer mt={9} />
    </Container>
  )
}
