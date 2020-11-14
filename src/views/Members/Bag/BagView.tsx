import React from "react"

import { Box, Container, Grid, Typography } from "@material-ui/core"
import { BagItemCard } from "./BagItemCard"
import { BagItemGrid } from "./BagItemGrid"

export const BagView = ({ member, adminKey }) => {
  console.log(member)

  return (
    <Box>
      <Container maxWidth={false}>
        <Box mt={4} mb={4}>
          <Box mt={1} mb={2}>
            <Typography variant="h3">Bag</Typography>
          </Box>
          <Grid container spacing={2}>
            {member.bagItems
              .filter(a => a.saved === false)
              .map(bagItem => {
                return (
                  <Grid item lg={4} md={4} sm={4} xs={12} key={`product-card`}>
                    <BagItemCard bagItem={bagItem} member={member} />
                  </Grid>
                )
              })}
          </Grid>
        </Box>
        <Box mt={4} mb={4}>
          <Box mt={1} mb={2}>
            <Typography variant="h3">Saved Items</Typography>
          </Box>
          <BagItemGrid bagItems={member.bagItems.filter(a => a.saved === true)} />
        </Box>
      </Container>
    </Box>
  )
}
