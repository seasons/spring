import React, { useState } from "react"
import { useHistory } from "react-router-dom"

import { Box, Grid } from "@material-ui/core"
import { styled as muiStyled } from "@material-ui/core/styles"

import { Separator, Spacer, Text } from "components"
import {
  ProductEditQuery_product_variants,
  ProductEditQuery_product_variants_physicalProducts,
} from "generated/ProductEditQuery"
import { OffloadPhysicalProductModal } from "../PhysicalProductEdit/Components"
import { colors } from "theme/colors"

export interface VariantSummaryProps {
  productID: string
  variant: ProductEditQuery_product_variants
}

export const VariantSummary: React.FC<VariantSummaryProps> = ({ productID, variant }) => {
  const history = useHistory()
  const [openOffloadPhysicalProductModal, setOpenOffloadPhysicalProductModal] = useState(false)
  const [offloadPhysicalProduct, setOffloadPhysicalProduct] = useState<
    ProductEditQuery_product_variants_physicalProducts
  >()

  const onCloseOffloadPhysicalProductModal = () => {
    setOpenOffloadPhysicalProductModal(false)
  }

  const onClickView = () => {
    history.push(`/inventory/product/variants/${variant.id}`)
  }

  const onClickOffloadPhysicalProduct = (physicalProduct: ProductEditQuery_product_variants_physicalProducts) => {
    setOpenOffloadPhysicalProductModal(true)
    setOffloadPhysicalProduct(physicalProduct)
  }

  return (
    <Grid item xs={12}>
      <Spacer mt={3} />
      <Text variant="h4">{variant.internalSize?.display}</Text>
      <Spacer mt={3} />
      <Container px={2} py={3} display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" flexDirection="column">
            <Text variant="h5">{variant.sku}</Text>
            <Text variant="h5" opacity={0.5}>
              Total count: {variant.physicalProducts?.length}
            </Text>
          </Box>
          <ActionBox px={2} py={0.5} bgcolor={colors.white95} onClick={onClickView}>
            <Text variant="h6">View</Text>
          </ActionBox>
        </Box>
        <Spacer mt={3} />
        <Separator />
        <Spacer mt={3} />
        <Box display="flex" flexDirection="column">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Text variant="h5" style={{ flexGrow: 1 }}>
                SUID
              </Text>
            </Grid>
            <Grid item xs={6}>
              <Text variant="h5" style={{ flexGrow: 1 }}>
                Inventory status
              </Text>
            </Grid>
            {variant.physicalProducts?.map(
              (physicalProduct: ProductEditQuery_product_variants_physicalProducts, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={6}>
                    <PhysicalProductField>
                      <Text variant="h6">{physicalProduct.seasonsUID}</Text>
                    </PhysicalProductField>
                  </Grid>
                  <Grid item xs={6}>
                    <Box display="flex" alignItems="center">
                      <PhysicalProductField flexGrow={1}>
                        <Text variant="h6">{physicalProduct.inventoryStatus}</Text>
                      </PhysicalProductField>
                      {physicalProduct.inventoryStatus !== "Offloaded" && (
                        <>
                          <Spacer ml={2} />
                          <ActionBox
                            px={2}
                            py={1}
                            bgcolor={colors.black100}
                            onClick={() => onClickOffloadPhysicalProduct(physicalProduct)}
                          >
                            <Text variant="h6" color={colors.white100}>
                              Offload
                            </Text>
                          </ActionBox>
                        </>
                      )}
                    </Box>
                  </Grid>
                </React.Fragment>
              )
            )}
          </Grid>
        </Box>
        {openOffloadPhysicalProductModal && offloadPhysicalProduct && (
          <OffloadPhysicalProductModal
            open={openOffloadPhysicalProductModal}
            onClose={onCloseOffloadPhysicalProductModal}
            physicalProduct={offloadPhysicalProduct}
          />
        )}
      </Container>
    </Grid>
  )
}

const Container = muiStyled(Box)({
  borderRadius: 4,
  border: `solid 1px ${colors.white90}`,
})

const PhysicalProductField = muiStyled(Box)({
  padding: "14px 16px",
  backgroundColor: colors.white95,
  borderRadius: 4,
})

export const ActionBox = muiStyled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  cursor: "pointer",
})
