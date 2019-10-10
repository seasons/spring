import React from "react"

export const ImagesField = ({ record = {}, source }) => {
  const images = record[source]
  return (
    <div>
      {images.map(image => {
        const { url, width, height } = image.thumbnails.small
        return <img src={url} width={width} height={height} />
      })}
    </div>
  )
}
