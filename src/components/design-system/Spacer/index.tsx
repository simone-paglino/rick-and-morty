import React, { FC } from 'react'
import { SpacerStyled } from './styled'

type SpacerProps = {
  isHorizontal?: boolean
  level: number
}

const Spacer: FC<SpacerProps> = ({ isHorizontal = false, level }) => {
  const getSpacing = (rawSpacing: number) => {
    if (rawSpacing % 0.5 === 0) {
      return 8 * rawSpacing
    }

    return 0
  }

  return (
    <SpacerStyled isHorizontal={isHorizontal} spacing={getSpacing(level)} />
  )
}

export default Spacer
