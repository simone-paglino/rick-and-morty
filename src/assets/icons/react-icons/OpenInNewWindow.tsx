import React, { FC } from 'react'
import { ReactIconProps } from './types'

export const OpenInNewWindow: FC<ReactIconProps> = ({ color = 'black' }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_215_2)">
        <path
          d="M25.3333 25.3333H6.66667V6.66667H16V4H6.66667C5.18667 4 4 5.2 4 6.66667V25.3333C4 26.8 5.18667 28 6.66667 28H25.3333C26.8 28 28 26.8 28 25.3333V16H25.3333V25.3333ZM18.6667 4V6.66667H23.4533L10.3467 19.7733L12.2267 21.6533L25.3333 8.54667V13.3333H28V4H18.6667Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_215_2">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
