import React, { FC } from 'react'
import { ButtonStyled } from './styled'
import { ButtonProps, ButtonSize } from './types'

const buttonSize: Record<ButtonSize, string> = {
  small: '4px 8px',
  regular: '8px 12px',
  large: '12px 16px',
}

const Button: FC<ButtonProps> = ({
  children,
  disabled = false,
  onClick,
  size = 'regular',
}) => {
  return (
    <ButtonStyled
      type="button"
      size={buttonSize[size]}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ButtonStyled>
  )
}

export default Button
