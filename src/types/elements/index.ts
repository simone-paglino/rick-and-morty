import { ReactNode } from 'react'
import { ButtonSize } from '../../components/elements/Button/types'

export type IconMoreLessProps = {
  onClick: () => void
  show?: boolean
  className?: string
}

export type ButtonProps = {
  children: ReactNode
  disabled?: boolean
  onClick: () => void
  size?: ButtonSize
}
