import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"

import { Button, Grid, Hidden, Typography } from "@material-ui/core"
import BarChartIcon from "@material-ui/icons/BarChart"

const StyledBarChartIcon = styled(BarChartIcon)`
  margin-right: 10px;
`

const StyledImg = styled.img`
  width: 100%;
  max-height: 400px;
`

const Root = styled.div`
  margin-top: 20vh;
`

export const Header: React.FC = () => {
  const session = useSelector(state => state.session)

  return (
    <Root>
      <Grid alignItems="center" container justify="space-between" spacing={3}>
        <Grid item md={6} xs={12}>
          <Typography component="h2" gutterBottom variant="overline">
            Home
          </Typography>
          <Typography component="h1" gutterBottom variant="h3">
            Good Morning, {session.user.firstName}
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            You done made a lot of money today. TIME TO RETIRE!
          </Typography>
          <Button color="primary" variant="contained">
            <StyledBarChartIcon />
            View summary
          </Button>
        </Grid>
        <Hidden smDown>
          <Grid item md={6}>
            <StyledImg alt="Cover" src="/images/undraw_growth_analytics_8btt.svg" />
          </Grid>
        </Hidden>
      </Grid>
    </Root>
  )
}
