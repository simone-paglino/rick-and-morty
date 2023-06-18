import React, { FC, ReactNode } from 'react'
import { PageWrapperStyled } from './styled'

type PageWrapperProps = {
  children: ReactNode
  maxWidth?: number
}

const PageWrapper: FC<PageWrapperProps> = ({ children, maxWidth }) => {
  return <PageWrapperStyled maxWidth={maxWidth}>{children}</PageWrapperStyled>
}

export default PageWrapper
