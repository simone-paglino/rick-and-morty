import { CSSProperties } from 'react'
import styled from 'styled-components'

export type FlexBoxStyledProps = {
  alignItems: CSSProperties['alignItems']
  flexDirection: CSSProperties['flexDirection']
  fullWidth: boolean
  justifyContent: CSSProperties['justifyContent']
}

export const FlexBoxStyled = styled.div<FlexBoxStyledProps>`
  display: flex;
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
  ${({ flexDirection }) => flexDirection && `flex-direction: ${flexDirection};`}
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent};`}
`
