import React, { FC, ReactNode } from 'react'
import { CenterStyled } from './styled'

type CenterProps = {
  children: ReactNode
}

const Center: FC<CenterProps> = ({ children }) => {
  return <CenterStyled>{children}</CenterStyled>
}

export default Center
