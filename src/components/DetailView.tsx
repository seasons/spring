import { ComponentError, Spacer } from "components"
import React, { useState } from "react"
import { Loading, useQueryWithStore } from "@seasons/react-admin"
import { Redirect, useHistory } from "react-router-dom"

import { Box, colors, Container, Divider, Tab, Tabs, Theme } from "@material-ui/core"
import { Snackbar, Header as BaseHeader } from "components"
import { makeStyles } from "@material-ui/styles"
import { SnackbarState } from "./Snackbar"

const useStyles = makeStyles<Theme>(theme => ({
  tabs: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(5),
  },
  divider: {
    backgroundColor: colors.grey[300],
  },
  content: {
    marginTop: theme.spacing(2),
  },
}))

export interface DetailViewMatch {
  params: { id: string; tab: string }
  path: string // e.g /members/ckerk33lg041p07197gb16f8y/account
}

export interface TabRenderProps {
  data: any
  adminKey: string
  recordID: string
  match: DetailViewMatch
  toggleSnackbar: (state: SnackbarState) => void
}

export interface HeaderRenderProps {
  data: any
  toggleSnackbar: (state: SnackbarState) => void
}

export interface DetailViewProps {
  match: DetailViewMatch
  resource: "Customer" | "Reservation" | "PhysicalProduct"
  renderHeader: (props: HeaderRenderProps) => React.Component
  tabs: Array<{
    value: string
    label: string
    render: (props: TabRenderProps) => React.Component | JSX.Element
  }>
}

export const DetailView: React.FunctionComponent<DetailViewProps> = ({
  match,
  tabs,
  resource,
  renderHeader,
  ...props
}) => {
  const classes = useStyles()
  const { tab: currentTab, id: recordID } = match.params

  const history = useHistory()

  const [snackbar, toggleSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    status: "success",
  })

  // Get the data
  const { data, loading, loaded, error } = useQueryWithStore({
    type: "getOne",
    resource,
    payload: { id: recordID },
  })
  if (!loaded || loading) return <Loading />
  if (error || !data) return <ComponentError />

  // Edge Case
  if (!tabs.map(t => t.value).includes(currentTab)) {
    const pathStart = match.path.split("/")?.[1]
    const firstTab = tabs?.[0]?.value
    return <Redirect to={`/${pathStart}/${recordID}/${firstTab}`} />
  }

  // Main case
  const renderCurrentTab = () => {
    const activeTab = tabs.find(t => t.value === currentTab)
    const adminStoreKey = JSON.stringify({ type: "GET_ONE", resource, payload: { id: data.id } })
    return activeTab?.render({ data, adminKey: adminStoreKey, match, recordID: match.params.id, toggleSnackbar })
  }
  return (
    <Container maxWidth={false}>
      {renderHeader({ data, toggleSnackbar })}
      <Spacer mt={2} />
      <Tabs
        indicatorColor={"primary"}
        onChange={(event, value) => {
          history.push(value)
        }}
        scrollButtons="auto"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map(tab => (
          <Tab key={tab.value} label={tab.label} value={tab.value} className={classes.tab} />
        ))}
      </Tabs>
      <Divider className={classes.divider} />
      <Box mt={2}>{renderCurrentTab()}</Box>
      <Snackbar state={snackbar} toggleSnackbar={toggleSnackbar} />
    </Container>
  )
}
