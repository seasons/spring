import React, { useState } from "react"
import { TextField, AutocompleteField } from "fields"
import pushNotifsData from "../../../data/pushNotifications.json"

export const RouteField = () => {
  const { routes } = pushNotifsData
  return <AutocompleteField label="Route" name="route" multiple={false} options={routes} />
}
