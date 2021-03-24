import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { Box, Button, Grid } from "@material-ui/core"
import { styled as muiStyled } from "@material-ui/core/styles"
import { Separator, Spacer, Text } from "components"
import {
  ProductEditQuery_product_variants,
  ProductEditQuery_product_variants_physicalProducts,
} from "generated/ProductEditQuery"
import { useRefresh } from "@seasons/react-admin"
import { colors } from "theme/colors"
import { SnackbarState } from "components/Snackbar"
import { OffloadPhysicalProductModal } from "views/Inventory/PhysicalProducts/Components"
import { AddPhysicalProductModal } from "views/Inventory/ProductVariants/AddPhysicalProductModal"
import PlusOneRoundedIcon from "@material-ui/icons/PlusOneRounded"
export interface VariantSummaryProps {
  variant: ProductEditQuery_product_variants
  toggleSnackbar?: (state: SnackbarState) => void
}

export const VariantSummary: React.FC<VariantSummaryProps> = ({ variant, toggleSnackbar }) => {
  const history = useHistory()
  const refresh = useRefresh()
  const [openOffloadPhysicalProductModal, setOpenOffloadPhysicalProductModal] = useState(false)
  const [openAddPhysicalProductModal, setOpenAddPhysicalProductModal] = useState(false)
  const [offloadPhysicalProduct, setOffloadPhysicalProduct] = useState<
    ProductEditQuery_product_variants_physicalProducts
  >()

  const onCloseOffloadPhysicalProductModal = () => {
    setOpenOffloadPhysicalProductModal(false)
    setOffloadPhysicalProduct(undefined)
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
          <Box display="flex" flexDirection="row">
            <Button
              variant="contained"
              color="primary"
              startIcon={<PlusOneRoundedIcon />}
              onClick={() => {
                setOpenAddPhysicalProductModal(true)
              }}
            >
              Add
            </Button>
            <ActionBox ml={1} px={2} py={0.5} bgcolor={colors.white95} onClick={onClickView}>
              <Text variant="h6">View</Text>
            </ActionBox>
          </Box>
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
                            bgcolor={colors.white95}
                            onClick={() => onClickOffloadPhysicalProduct(physicalProduct)}
                          >
                            <Text variant="h6">Offload</Text>
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
            toggleSnackbar={toggleSnackbar}
          />
        )}
        <AddPhysicalProductModal
          open={openAddPhysicalProductModal}
          productVariant={variant}
          onSuccess={() => {
            refresh()
          }}
        />
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
