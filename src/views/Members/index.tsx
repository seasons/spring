import { Header } from "components/Header"
import { EntityCountField, FullNameField, StatusField, ViewEntityField } from "fields"
import React from "react"
import { Datagrid, List, TextField } from "react-admin"

import { Container, Theme } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

import { MemberFilter } from "./MemberFilter"

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    marginTop: theme.spacing(10),
  },
}))

export interface MemberListProps {
  history: any
  match: any
  props?: any
}

export const MemberList: React.FunctionComponent<MemberListProps> = ({ match, history, props }) => {
  const classes = useStyles()

  const createNewMember = () => {
    history.push("/members/new")
  }

  return (
    <>
      <Container maxWidth={false} className={classes.root}>
        <Header title="Members" newEntityText="New Member" newEntityHandler={createNewMember} />
        <List
          {...props}
          filters={<MemberFilter />}
          perPage={10}
          hasCreate={false}
          hasEdit={false}
          hasList={true}
          hasShow={true}
          resource={"Customer"}
          basePath="/members"
        >
          <Datagrid>
            <FullNameField label="Name" />
            <TextField source="detail.shippingAddress.city" label="City" />
            <TextField source="detail.shippingAddress.state" label="State" />
            <TextField source="plan" label="Membership" />
            <StatusField label="Status" />
            <TextField source="bagItems.id" label="Money Spent" />
            <EntityCountField label="Current Items" entityName="bagItems" />
            <ViewEntityField entityPath="members" entityTab="account" source="user.id" label="Actions" />
          </Datagrid>
        </List>
      </Container>
    </>
  )
}
