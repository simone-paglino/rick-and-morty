import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'

type BackDropStyledProps = Pick<BackDropProps, 'useBackground'>

const BackDropStyled = styled.div<BackDropStyledProps>`
  position: absolute;
  inset: 0;
  background: ${({ useBackground }) =>
    useBackground ? 'hsla(0, 100%, 0%, 0.8)' : 'transparent'};
  overflow: hidden;
  z-index: 98;
  display: flex;
  align-items: center;
  justify-content: center;
`

type BackDropProps = {
  children: ReactNode
  onClick: () => void
  useBackground?: boolean
}

const BackDrop: FC<BackDropProps> = ({
  children,
  onClick,
  useBackground = true,
}) => {
  return (
    <BackDropStyled useBackground={useBackground} onClick={onClick}>
      {children}
    </BackDropStyled>
  )
}

export default BackDrop
