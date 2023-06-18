import React, { FC } from 'react'
import { CharacterStatusType } from '../../../types'
import Spacer from '../../design-system/Spacer'
import FlexBox from '../../design-system/FlexBox'
import Text from '../../design-system/Text'
import { CircleStyled } from './styled'

type CharacterStatusProps = {
  status: CharacterStatusType
}

const CharacterStatus: FC<CharacterStatusProps> = ({ status }) => {
  return (
    <FlexBox alignItems="center">
      <CircleStyled characterStatus={status} />
      <Spacer level={1} isHorizontal />
      <Text typography="normal">{status}</Text>
    </FlexBox>
  )
}

export default CharacterStatus
