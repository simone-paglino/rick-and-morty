import styled from 'styled-components'
import { CharacterStatusType } from '../../../types'
import { COLORS } from '../../theme/colors'

type CircleStyledProps = {
  characterStatus: CharacterStatusType
}

const getCircleColor = (status: CharacterStatusType) => {
  switch (status) {
    case 'unknown':
      return COLORS.yellow
    case 'Alive':
      return COLORS.green
    case 'Dead':
      return COLORS.red
    default:
      return COLORS.white
  }
}

export const CircleStyled = styled.span<CircleStyledProps>`
  height: 14px;
  width: 14px;
  border-radius: 50%;
  background-color: ${({ characterStatus }) => getCircleColor(characterStatus)};
`
