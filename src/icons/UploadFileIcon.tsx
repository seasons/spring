import React from "react"

export const UploadFileIcon: React.FC = props => {
  return (
    <svg width={66} height={66} viewBox="0 0 66 66" {...props}>
      <title>{"Group"}</title>
      <g transform="translate(1 1)" fill="none" fillRule="evenodd">
        <circle stroke="#D4D4D4" fill="#F6F6F6" cx={32} cy={32} r={32} />
        <g transform="translate(22 22)" fill="#000">
          <rect transform="rotate(90 10 10)" x={9} width={2} height={20} rx={1} />
          <rect x={9} width={2} height={20} rx={1} />
        </g>
      </g>
    </svg>
  )
}
