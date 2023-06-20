import styled from 'styled-components'
import { COLORS } from '../../theme/colors'
import { SIZES } from '../../theme/sizes'

export const CardStyledNew = styled.div`
  border: 1px solid ${COLORS['blue-lighter']};
  border-radius: ${SIZES[8]};
  padding: ${SIZES[24]};
  max-width: 462px;
  width: calc(100% - 48px);
  position: relative;
  cursor: pointer;
`

export const Line = styled.span`
  display: inline-block;
  height: 1px;
  width: 16px;
  background-color: ${COLORS['black']};
`

export const IconWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  max-height: 32px;
  transform: scale(0.75);
`
