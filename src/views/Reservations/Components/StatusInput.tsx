import React, { useState, useEffect } from "react"
import { Tabs, Tab } from "@material-ui/core"
import { Field } from "fields/Field"

export const StatusInput = ({
  source,
  value,
  tabs,
  onChange,
  alwaysOn,
}: {
  source: any
  value?: any
  tabs: any
  onChange?: (value: any) => void
  alwaysOn?: boolean
}) => {
  const [currentTab, setCurrentTab] = useState("all")

  useEffect(() => {
    onChange?.([])
  })

  return (
    <Field
      name={source}
      render={({ input, meta }) => (
        <Tabs
          onChange={(e, key) => {
            const tab = tabs.find(a => a.id === key)
            setCurrentTab(tab.id)
            const filters = tab.value
            input.onChange(filters)
            onChange?.(filters)
          }}
          scrollButtons="auto"
          textColor="secondary"
          value={currentTab}
          variant="standard"
        >
          {tabs.map((tab, i) => (
            <Tab key={tab.id} value={tab.id} label={tab.label} />
          ))}
        </Tabs>
      )}
    />
  )
}
