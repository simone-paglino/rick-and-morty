import { ReactNode } from 'react'

export type ButtonSize = 'small' | 'regular' | 'large'

export type ButtonProps = {
  children: ReactNode
  disabled?: boolean
  onClick: () => void
  size?: ButtonSize
}
