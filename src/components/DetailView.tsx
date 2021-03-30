import { ComponentError, Spacer } from "components"
import React from "react"
import { Loading, useQueryWithStore } from "@seasons/react-admin"
import { Redirect, useHistory } from "react-router-dom"

import { Box, colors, Container, Divider, Tab, Tabs, Theme } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

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
}

export interface HeaderRenderProps {
  data: any
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
    return activeTab?.render({ data, adminKey: adminStoreKey, match, recordID: match.params.id })
  }
  return (
    <Container maxWidth={false}>
      {renderHeader({ data })}
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
    </Container>
  )
}
