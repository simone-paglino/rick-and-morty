import styled, { css } from 'styled-components'
import { SIZES } from '../../theme/sizes'

type PageWrapperStyledProps = {
  maxWidth?: number
}

export const PageWrapperStyled = styled.div<PageWrapperStyledProps>`
  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${maxWidth}px;
      margin-inline: auto;
    `}
  padding-top: ${SIZES[48]};

  @media screen and(max-width: 1339px) {
    padding: ${SIZES[48]};
  }
`
