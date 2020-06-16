import React, { useState } from "react"
import { TextField, AutocompleteField } from "fields"
import { useQuery } from "react-apollo"
import gql from "graphql-tag"
import pushNotifsData from "../../../data/pushNotifications.json"

const GET_EMAILS = gql`
  query userEmails {
    users {
      email
    }
  }
`

export const TargetField = () => {
  const { data } = useQuery(GET_EMAILS)
  const { interests } = pushNotifsData
  return (
    <AutocompleteField
      label="Target"
      name="target"
      multiple={false}
      options={[...interests, ...(data?.users?.map(a => a.email) || [])]}
    />
  )
}
