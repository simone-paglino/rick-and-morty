import styled, { css } from 'styled-components'
import { HtmlTextElements } from '../../theme/fonts'

type TextStyledProps = {
  color?: string
  fontSize: string
  fontWeight: number
  lineHeight: number
}

export const getTextStyled = (variant: HtmlTextElements) =>
  styled(variant)<TextStyledProps>`
    ${({ fontSize, fontWeight, lineHeight }) => css`
      font-size: ${fontSize};
      font-weight: ${fontWeight};
      line-height: ${lineHeight};
    `}
    ${({ color }) => color && `color: ${color};`}
  `
