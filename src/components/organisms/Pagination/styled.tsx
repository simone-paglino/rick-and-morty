import styled from 'styled-components'
import { COLORS } from '../../theme/colors'
import { SIZES } from '../../theme/sizes'

export const PaginationStyled = styled.div`
  width: 100%;
  padding: ${SIZES[16]} 0;
  background-color: ${COLORS['black-lighter']};
  position: fixed;
  bottom: 0;
  left: 0;
`
