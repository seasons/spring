import React from "react"
import get from "lodash/get"

export const ImagesField = ({ record = {}, source }) => {
  const images = record[source] || []
  return (
    <div>
      {images.map(image => {
        const { url, width, height } = get(image, "thumbnails.small", { url: "", width: 0, height: 0 })
        return <img src={url} width={width} height={height} alt="" />
      })}
    </div>
  )
}
