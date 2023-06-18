import styled from 'styled-components'
import { SIZES } from '../../theme/sizes'

type StatusWrapperProps = {
  borderColor: string
}

export const StatusWrapper = styled.div<StatusWrapperProps>`
  display: inline-block;
  padding: ${SIZES[4]} ${SIZES[8]};
  border-radius: 4px;
  border: 2px solid ${({ borderColor }) => borderColor};
`
