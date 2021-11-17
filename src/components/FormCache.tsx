import React, { useEffect, useState } from "react"
import { useForm } from "react-final-form"
import { useLocation } from "react-router-dom"
import { debounce } from "lodash"

const CACHE_DATA_KEY = "draftProducts"

export const deleteDraftFromCache = location => {
  const cacheKey = location.search.replace("?cacheKey=", "")

  let cacheData = readCacheData()
  delete cacheData[cacheKey]
  localStorage.setItem(CACHE_DATA_KEY, JSON.stringify(cacheData))
}

const readCacheData = () => {
  let cacheData = {}

  try {
    cacheData = JSON.parse(localStorage.getItem(CACHE_DATA_KEY) ?? "{}")
  } catch (e) {}

  return cacheData
}

export const FormCache = props => {
  const { cacheKey: id } = props
  const [cacheId, setCacheId] = useState("")
  const location = useLocation()
  const form = useForm()

  const cacheKeyFromLocation = () => {
    return location.search.replace("?cacheKey=", "")
  }

  useEffect(() => {
    if (cacheId === "") {
      setCacheId(id)
    }
  }, [id])

  useEffect(() => {
    let cacheKey = cacheKeyFromLocation()

    if (cacheKey) {
      setCacheId(cacheKey)

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
        CACHE_DATA_KEY,
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
