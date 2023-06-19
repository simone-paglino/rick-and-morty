import styled from 'styled-components'
import { COLORS } from '../../theme/colors'
import { SIZES } from '../../theme/sizes'

export const CardStyled = styled.div`
  border: 2px solid ${COLORS['white']};
  border-radius: ${SIZES[8]};
  width: 100%;
`

export const CardStyledNew = styled.div`
  border: 1px solid ${COLORS['blue-lighter']};
  border-radius: ${SIZES[8]};
  padding: ${SIZES[24]};
  max-width: 462px;
  width: calc(100% - 48px);
`

export const Line = styled.span`
  display: inline-block;
  height: 1px;
  width: 16px;
  background-color: ${COLORS['black']};
`
