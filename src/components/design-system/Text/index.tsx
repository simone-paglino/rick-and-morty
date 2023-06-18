import React, { ReactNode, useMemo } from 'react'
import {
  MapTypographiesProps,
  TYPOGRAPHIES,
  TypographiesKeys,
  TYPOGRAPHY_USAGES,
} from '../../theme/fonts'
import { getTextStyled } from './styled'
import { getTextHtmlElement } from './utils'
import { COLORS } from '../../theme/colors'

type TextProps<Typography extends TypographiesKeys> = {
  children?: ReactNode
  colorKey?: keyof typeof COLORS
  isInline?: boolean
  typography: Typography
  usage?: MapTypographiesProps<Typography>
}

const Text = <Typography extends TypographiesKeys>({
  children,
  colorKey,
  isInline = false,
  typography,
  usage,
}: TextProps<Typography>) => {
  const { defaultUsage, fontSize, htmlElement, lineHeight } =
    TYPOGRAPHIES[typography]

  const htmlElementToRender = getTextHtmlElement({
    defaultHtmlElement: htmlElement,
    isInline,
    typography,
    usage: usage ?? defaultUsage,
  })

  const TextStyled = getTextStyled(htmlElementToRender)

  const TextStyledMemoized = useMemo(
    () => TextStyled,
    [typography, usage, isInline]
  )

  return (
    <TextStyledMemoized
      color={colorKey ? COLORS[colorKey] : undefined}
      fontSize={fontSize.desktop}
      fontWeight={TYPOGRAPHY_USAGES[usage ?? defaultUsage]}
      lineHeight={lineHeight}
    >
      {children}
    </TextStyledMemoized>
  )
}

export default Text
