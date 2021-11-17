import React, { useCallback, useEffect, useState } from "react"
import cuid from "cuid"
import { useForm } from "react-final-form"
import { useLocation } from "react-router-dom"
import { debounce } from "lodash"

export const FormCache = props => {
  const { cacheKey: id } = props
  const [cacheId, setCacheId] = useState("")
  const location = useLocation()
  const form = useForm()

  const cacheKeyFromLocation = () => {
    return location.search.replace("?cacheKey=", "")
  }

  const readCacheData = () => {
    let cacheData = {}

    try {
      cacheData = JSON.parse(localStorage.getItem("draftProducts") ?? "{}")
    } catch (e) {}

    return cacheData
  }

  useEffect(() => {
    let cacheKey = cacheKeyFromLocation()
    setCacheId(cacheKey ?? id)

    if (cacheKey) {
      const cacheData = readCacheData()

      if (cacheData[cacheKey]) {
        form.initialize(cacheData[cacheKey])
      }
    }
  }, [])

  const handleStateChange = debounce((state: any) => {
    const { values } = state

    if (cacheId && values && values?.name?.length > 5) {
      const cacheData = readCacheData()
      localStorage.setItem(
        "draftProducts",
        JSON.stringify({
          ...cacheData,
          [cacheId]: {
            ...values,
            lastModified: new Date().toISOString(),
          },
        })
      )
    }
  }, 1000)

  form.subscribe(handleStateChange, { values: true })

  return <></>
}
