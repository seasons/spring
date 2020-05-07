import { ComponentError } from "components"
import React from "react"
import { Loading, useQueryWithStore } from "react-admin"
import { Redirect } from "react-router-dom"

import { colors, Container, Divider, Tab, Tabs, Theme } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

import { AccountView } from "./Account"
import { Header } from "./Header"
import { HistoryView } from "./History"
import { MemberViewProps } from "./interfaces"
import { PersonalView } from "./Personal"

const useStyles = makeStyles<Theme>(theme => ({
  tabs: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(5),
  },
  tab: {
    textTransform: "none",
  },
  divider: {
    backgroundColor: colors.grey[300],
    marginLeft: theme.spacing(5),
  },
  content: {
    marginTop: theme.spacing(3),
  },
}))

export const MemberView: React.FunctionComponent<MemberViewProps> = ({ match, history, props }) => {
  const classes = useStyles()
  const { tab: currentTab, id: memberId } = match.params
  const tabs = [
    { value: "account", label: "Account" },
    { value: "personal", label: "Personal" },
    { value: "history", label: "History" },
  ]

  const { data, loading, error } = useQueryWithStore({
    type: "getOne",
    resource: "Customer",
    payload: { id: memberId },
  })

  if (loading) return <Loading />

  if (error || !data) return <ComponentError />

  const handleTabsChange = (event, value) => {
    history.push(value)
  }

  if (!currentTab) {
    return <Redirect to={`/members/${memberId}/account`} />
  }

  const adminStoreKey = `{"type":"GET_ONE","resource":"Customer","payload":{"id":"${data.id}"}}`

  return (
    <Container maxWidth={false}>
      <Header history={history} member={data} />
      <Tabs
        className={classes.tabs}
        indicatorColor={"primary"}
        onChange={handleTabsChange}
        scrollButtons="auto"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map(tab => (
          <Tab key={tab.value} label={tab.label} value={tab.value} className={classes.tab} />
        ))}
      </Tabs>
      <Divider className={classes.divider} />
      <div className={classes.content}>
        {currentTab === "account" && (
          <AccountView {...props} basePath={`/members/${memberId}/account`} member={data} adminKey={adminStoreKey} />
        )}
        {currentTab === "personal" && (
          <PersonalView {...props} basePath={`/members/${memberId}/personal`} member={data} adminKey={adminStoreKey} />
        )}
        {currentTab === "history" && <HistoryView {...props} basePath={`/members/${memberId}/history`} member={data} />}
      </div>
    </Container>
  )
}
