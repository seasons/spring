import { ComponentError, Spacer } from "components"
import React from "react"
import { Loading, useQueryWithStore } from "@seasons/react-admin"
import { Redirect } from "react-router-dom"

import { Box, colors, Container, Divider, Tab, Tabs, Theme } from "@material-ui/core"
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
  divider: {
    backgroundColor: colors.grey[300],
  },
  content: {
    marginTop: theme.spacing(2),
  },
}))

export const MemberView: React.FunctionComponent<MemberViewProps> = ({ match, history, props }) => {
  const classes = useStyles()
  const { tab: currentTab, id: memberID } = match.params
  const tabs = [
    { value: "account", label: "Account" },
    { value: "personal", label: "Personal" },
    { value: "history", label: "History" },
  ]

  const { data, loading, error } = useQueryWithStore({
    type: "getOne",
    resource: "Customer",
    payload: { id: memberID },
  })

  if (loading) return <Loading />

  if (error || !data) return <ComponentError />

  const handleTabsChange = (event, value) => {
    history.push(value)
  }

  if (!currentTab) {
    return <Redirect to={`/members/${memberID}/account`} />
  }

  const adminStoreKey = JSON.stringify({ type: "GET_ONE", resource: "Customer", payload: { id: data.id } })

  return (
    <Container maxWidth={false}>
      <Header history={history} member={data} />
      <Spacer mt={2} />
      <Tabs
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
      <Box mt={2}>
        {currentTab === "account" && (
          <AccountView
            {...props}
            match={match}
            basePath={`/members/${memberID}/account`}
            member={data}
            adminKey={adminStoreKey}
          />
        )}
        {currentTab === "personal" && (
          <PersonalView {...props} basePath={`/members/${memberID}/personal`} member={data} adminKey={adminStoreKey} />
        )}
        {currentTab === "history" && <HistoryView {...props} basePath={`/members/${memberID}/history`} member={data} />}
      </Box>
    </Container>
  )
}
