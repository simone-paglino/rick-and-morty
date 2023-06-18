import styled, { css } from 'styled-components'

type SpacerStyledProps = {
  isHorizontal: boolean
  spacing: number
}

export const SpacerStyled = styled.div<SpacerStyledProps>`
  ${({ isHorizontal, spacing }) => css`
    ${isHorizontal ? `width: ${spacing}px` : `height: ${spacing}px`}
  `}
`
