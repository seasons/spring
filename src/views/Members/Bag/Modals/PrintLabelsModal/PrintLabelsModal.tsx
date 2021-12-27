import { ConfirmationDialog, DialogTitle, Separator, Spacer } from "components"
import { useMutation } from "@apollo/react-hooks"
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { PrintLabelCard } from "./PrintLabelCard"
import { useSnackbarContext } from "components/Snackbar"
import { useRefresh } from "@seasons/react-admin"
import { every } from "lodash"
import gql from "graphql-tag"
import { getPickupDateDisplay } from "../../BagItemCard"
interface PrintLabelsModalProps {
  open: boolean
  onClose?: () => void
  refetch?: () => void
  data: any
}

const GENERATE_LABELS = gql`
  mutation generateLabels($bagItemIds: [ID!]!, $options: GenerateShippingLabelOptionsInput) {
    generateShippingLabels(bagItemIds: $bagItemIds, options: $options) {
      id
      direction
      shippingLabel {
        id
        trackingNumber
        trackingURL
        image
      }
    }
  }
`

export const electShippingCode = bagItems => {
  const shippingCodes = bagItems.map(a => a.reservationPhysicalProduct.shippingMethod?.code)

  let shippingCode = "UPSGround"

  if (shippingCodes.includes("Pickup")) {
    shippingCode = "Pickup"
  } else if (shippingCodes.includes("UPSSelect")) {
    shippingCode = "UPSSelect"
  }

  return shippingCode
}

export const PrintLabelsModal: React.FC<PrintLabelsModalProps> = ({ data, open, onClose, refetch }) => {
  const [packages, setPackages] = useState({})
  const { showSnackbar } = useSnackbarContext()
  const [includeLabelForPickups, setIncludeLabelForPickups] = useState(false)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const refresh = useRefresh()

  const [generateLabels] = useMutation(GENERATE_LABELS, {
    onError: error => {
      showSnackbar({
        message: error?.message,
        status: "error",
      })
    },
    onCompleted: () => {
      refresh()
    },
  })

  const bagItems = data
  const allBagItemsHaveInboundPackages = every(
    bagItems,
    bagItem => !!bagItem.reservationPhysicalProduct.potentialInboundPackage?.id
  )

  useEffect(() => {
    const packages = {}
    const groupShippingCode = electShippingCode(bagItems)

    bagItems.forEach(item => {
      const unsetPackage = {
        id: "unset",
        direction: "Unset",
        bagItems: [],
      }
      const outboundPackage = item.reservationPhysicalProduct?.outboundPackage || unsetPackage
      const inboundPackage = item.reservationPhysicalProduct?.potentialInboundPackage || unsetPackage

      const addItemToPackages = (aPackage: any, item: any) => {
        if (!aPackage) {
          return null
        }

        const packageId = aPackage.id

        if (!packages[packageId]) {
          packages[packageId] = {
            package: aPackage,
            bagItems: [],
          }
        }

        if (
          !packages[packageId].bagItems.find(b => b.id === item.id) ||
          !(packageId === "unset" && groupShippingCode === "Pickup")
        ) {
          packages[packageId].bagItems.push(item)
        }
      }

      if (
        groupShippingCode !== "Pickup" ||
        (groupShippingCode === "Pickup" && outboundPackage && outboundPackage.id !== "unset")
      ) {
        addItemToPackages(outboundPackage, item)
      }
      addItemToPackages(inboundPackage, item)
    })
    setPackages(packages)
  }, [bagItems])

  const updateLabels = async () => {
    await generateLabels({
      variables: {
        bagItemIds: bagItems.map(b => b.id),
        options: {
          includeLabelForPickups,
        },
      },
    })

    refetch?.()
  }

  return (
    <>
      <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={() => onClose?.()}>
          Print Labels
        </DialogTitle>
        <DialogContent dividers style={{ minWidth: "400px" }}>
          {!allBagItemsHaveInboundPackages && (
            <>
              <Box my={2} alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includeLabelForPickups}
                      onChange={e => {
                        setIncludeLabelForPickups(e.target.checked)
                      }}
                    />
                  }
                  label="Create label for pick-ups"
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpenConfirmDialog(true)
                  }}
                  style={{ flex: 1 }}
                >
                  Generate Labels
                </Button>
              </Box>
              <Box my={2}>
                <Separator />
              </Box>
            </>
          )}
          <Box my={2}>
            {Object.values(packages).map((data: any) => {
              const pkg = data.package

              return (
                <Box key={pkg.id}>
                  <PrintLabelCard data={pkg} />

                  <Box mt={2} mb={2}>
                    <Card>
                      {data.bagItems.length > 0 ? (
                        <>
                          {data.bagItems.map((item, i) => {
                            const shippingMethod = item.reservationPhysicalProduct.shippingMethod

                            const codeToLabel = code => {
                              switch (code) {
                                case "UPSGround":
                                  return <Typography variant="overline">UPS Ground</Typography>
                                case "UPSSelect":
                                  return <Typography variant="overline">UPS Select</Typography>
                                case "Pickup":
                                  const r = item.reservationPhysicalProduct.reservation
                                  const pickupDate = r.pickupDate
                                  const pickupWindowDisplay = r.pickupWindow?.display

                                  return (
                                    <>
                                      <Typography variant="overline">Pickup</Typography>
                                      <Spacer mt={1} />
                                      <Typography variant="caption">
                                        {getPickupDateDisplay({ pickupDate, pickupWindowDisplay })}
                                      </Typography>
                                    </>
                                  )
                                default:
                                  return code
                              }
                            }

                            return (
                              <>
                                <Box m={2}>
                                  <Typography variant="body2">{item.physicalProduct.seasonsUID}</Typography>
                                  {pkg.id === "unset" && codeToLabel(shippingMethod?.code)}
                                </Box>
                                {i !== data.bagItems.length - 1 && <Separator />}
                              </>
                            )
                          })}
                        </>
                      ) : (
                        <Box>No labels to print</Box>
                      )}
                    </Card>
                  </Box>
                  <Box mt={4} mb={2}>
                    <Separator />
                  </Box>
                </Box>
              )
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose} color="primary" variant="contained">
            Done
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationDialog
        title={"Generate Labels"}
        body={"Are you sure you want to generate labels for these items? This will void and delete previous ones."}
        open={openConfirmDialog}
        setOpen={setOpenConfirmDialog}
        onClose={async (agreed: boolean) => {
          if (agreed) {
            await updateLabels()
          }
        }}
      />
    </>
  )
}
