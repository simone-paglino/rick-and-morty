import React, { FC, ReactNode } from 'react'
import { FlexBoxStyled, FlexBoxStyledProps } from './styled'

type FlexBoxProps = Partial<FlexBoxStyledProps> & {
  children?: ReactNode
}

const FlexBox: FC<FlexBoxProps> = ({
  alignItems = 'normal',
  children,
  flexDirection = 'row',
  fullWidth = false,
  justifyContent = 'flex-start',
}) => {
  return (
    <FlexBoxStyled
      {...{
        alignItems,
        flexDirection,
        fullWidth,
        justifyContent,
      }}
    >
      {children}
    </FlexBoxStyled>
  )
}

export default FlexBox
