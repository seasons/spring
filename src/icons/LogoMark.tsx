import React from "react"

interface LogoMarkProps {
  width?: number
  height?: number
}

export const LogoMark: React.FC<LogoMarkProps> = props => {
  const width = props.width || "24"
  const height = props.height || "24"

  return (
    <div {...props}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <g transform="translate(-568 -59)">
            <g transform="translate(568 59)">
              <g>
                <path fill="#EEA30E" d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12h24z"></path>
                <path
                  fill="#2A4BEE"
                  d="M24 24c0-6.627-5.373-12-12-12S0 17.373 0 24h24z"
                  transform="matrix(1 0 0 -1 0 36)"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
