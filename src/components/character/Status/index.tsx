import React, { FC } from 'react'
import { CharacterStatusType } from '../../../types/characters'
import Text from '../../design-system/Text'
import { StatusWrapper } from './styled'
import { getStatusColorKey } from './utils'
import { COLORS } from '../../theme/colors'

type CharacterStatusProps = {
  status: CharacterStatusType
}

const CharacterStatus: FC<CharacterStatusProps> = ({ status }) => {
  const colorKey = getStatusColorKey(status)

  return (
    <StatusWrapper borderColor={COLORS[colorKey]}>
      <Text colorKey={colorKey} typography="normal">
        {status}
      </Text>
    </StatusWrapper>
  )
}

export default CharacterStatus
