import styled from 'styled-components'
import { COLORS } from '../../theme/colors'

type ButtonStyledProps = {
  disabled: boolean
  size: string
}

export const ButtonStyled = styled.button<ButtonStyledProps>`
  padding: ${({ size }) => size};
  border: 0;
  border-radius: 4px;
  background-color: ${({ disabled }) =>
    disabled ? COLORS['blue-disabled'] : COLORS['blue']};
  cursor: pointer;
`
