import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { Box, Breadcrumbs, Grid, Link, Typography } from "@material-ui/core"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"

export const Header = ({ reservation, ...rest }) => {
  return (
    <>
      <Box mt={4}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link variant="body1" color="inherit" to="/app" component={RouterLink}>
            Dashboard
          </Link>
          <Link variant="body1" color="inherit" to="/reservations" component={RouterLink}>
            Reservations
          </Link>
          <Typography variant="body1" color="textPrimary">
            Reservation: {reservation.reservationNumber}
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box mt={3}>
        <Typography variant="h3" color="textPrimary">
          Reservation Details
        </Typography>
      </Box>
    </>
  )
}
