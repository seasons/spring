import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Typography, Box, Paper, TextField } from "@material-ui/core"
import { PhysicalProduct } from "generated/PhysicalProduct"
import { Autocomplete } from "@material-ui/lab"
import { useQuery } from "react-apollo"
import { PHYSICAL_PRODUCT_WITH_IMAGES } from "views/Inventory/PhysicalProducts/queries"

const Image = styled.img`
  margin-right: 5px;
  height: 100%;
`

const ProductImage = ({ product }: { product: PhysicalProduct }) => {
  const { data, loading } = useQuery(PHYSICAL_PRODUCT_WITH_IMAGES, { variables: { id: product.id } })
  const [image, setImage] = useState({ url: "" })

  useEffect(() => {
    if (!loading) {
      setImage(data?.physicalProduct?.productVariant?.product?.images?.[0])
    }
  }, [loading])

  return <Image src={image?.url} width={200} height={250} />
}

interface StowProductInfoProps {
  product?: PhysicalProduct
  locations?: any[]
  barcode?: string
  onChange?: (text: string) => void
}

export const StowProductInfo: React.FC<StowProductInfoProps> = ({ barcode, product, locations, onChange }) => {
  const productBrandCode = product?.seasonsUID?.split("-")?.[0]
  const [currentBarcode, setCurrentBarcode] = useState(barcode)
  const filteredLocations = locations?.filter(({ barcode }) => {
    if (barcode.startsWith("SR")) {
      const locationBrandCode = barcode.split("-")[2]
      if (locationBrandCode !== productBrandCode) {
        return false
      }
    }
    return true
  })

  useEffect(() => {
    setCurrentBarcode(barcode)
  }, [barcode])

  if (!product) {
    return null
  }

  return (
    <>
      <Box mb={2}>
        <Autocomplete
          id="combo-box-demo"
          options={filteredLocations || []}
          onChange={e => {
            const id = (e.currentTarget as any).innerText
            setCurrentBarcode(id)
            onChange?.(id)
          }}
          value={currentBarcode}
          getOptionSelected={(option, value) => {
            return currentBarcode == option.barcode
          }}
          getOptionLabel={option => option.barcode || ""}
          renderInput={params => {
            return <TextField {...params} label="Select Location" variant="outlined" />
          }}
          clearOnBlur={false}
          autoSelect
        />
      </Box>
      <Box mt={6} mb={1}>
        <Paper variant="outlined">
          <Box display="flex">
            <Box>
              <ProductImage product={product} />
            </Box>
            <Box flexGrow={1} px={2}>
              <Box my={2}>
                <Box display="flex" flexDirection="column">
                  <Box pb={2}>
                    <Typography variant="overline" color="textSecondary">
                      Seasons UID
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      {product.seasonsUID}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="overline" color="textSecondary">
                      Previous Warehouse Location
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      {product?.warehouseLocation?.barcode || "Unknown"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
        <Box my={1} mt={2}>
          {product?.reports?.map(report => {
            if (!report) {
              return null
            }
            // @ts-ignore
            const { damageTypes, notes } = report

            return (
              <Box>
                {damageTypes?.length > 0 && (
                  <>
                    <Typography variant="overline" color="textSecondary">
                      Damage Types
                    </Typography>
                    <Typography variant="body1">{damageTypes?.join(", ")}</Typography>
                  </>
                )}
                {(notes || "").length > 0 && (
                  <>
                    <Typography variant="overline" color="textSecondary">
                      Notes
                    </Typography>
                    <Typography variant="body1">{notes}</Typography>
                  </>
                )}
              </Box>
            )
          })}
        </Box>
        <Box my={1} mt={2}>
          <Box mt={1}>
            <Typography variant="overline" color="textSecondary">
              New Warehouse Location
            </Typography>
            <Typography variant="h4" color="textSecondary">
              {currentBarcode || "-"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}
