import { ComponentError } from "components"
import React, { useState } from "react"
import { Loading, useQueryWithStore } from "@seasons/react-admin"
import { OrderStatusModal } from "./Components/OrderStatusModal"
import { Header } from "components"
import { Container, Box, Typography, Grid } from "@material-ui/core"
import { OrderInfo } from "./Components/OrderInfo"
import { OrderLineItemGrid } from "./Components/OrderLineItemGrid"
import { Order } from "generated/Order"

export const OrderView = ({ match }) => {
  const { orderID } = match.params
  const [showModal, toggleModal] = useState(false)

  const { data, loading, loaded, error } = useQueryWithStore<Order>({
    type: "getOne",
    resource: "Order",
    payload: { id: orderID },
  })

  if (!loaded || loading) return <Loading />
  if (error || !data) return <ComponentError />

  return (
    <Container maxWidth={false}>
      <Header
        title={`Order: ${data.orderNumber}`}
        breadcrumbs={[
          {
            title: "Orders",
            url: "/orders",
          },
          {
            title: `Order: ${data.orderNumber}`,
            url: `/orders/${data.id}`,
          },
        ]}
        primaryButton={{
          text: "Update Status",
          action: async () => {
            toggleModal(true)
          },
        }}
      />
      <Box>
        <Grid container spacing={3}>
          <Grid item sm={12} md={3}>
            <Box mt={1} mb={2}>
              <Typography variant="h3">Info</Typography>
            </Box>
            <OrderInfo order={data} />
          </Grid>
          <Grid item sm={12} md={9}>
            <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" mb={2}>
              <Typography variant="h3">Line Items</Typography>
            </Box>
            <Box mb={4}>
              <Grid container spacing={2}>
                <OrderLineItemGrid lineItems={data.lineItems} />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <OrderStatusModal
        open={showModal}
        data={data}
        onClose={() => {
          toggleModal(false)
        }}
      />
    </Container>
  )
}
