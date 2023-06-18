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

  padding: ${SIZES[32]};

  @media screen and (max-width: 600px) {
    padding: ${SIZES[16]};
  }
`
