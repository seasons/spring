import React from "react"
import get from "lodash/get"

export const ImagesField = ({ record = {}, source, label }) => {
  const images = record[source] || []
  return (
    <div>
      {images.map(image => {
        const { url, width, height } = get(image, "thumbnails.small", { url: "", width: 0, height: 0 })
        return <img key={image.id} src={url} width={width} height={height} alt={image.filename} />
      })}
    </div>
  )
}
