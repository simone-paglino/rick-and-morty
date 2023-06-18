import {
  HtmlTextElements,
  TypographiesKeys,
  TypographyUsageKeys,
} from '../../theme/fonts'

type GetTextCSSPropertiesProps = (params: {
  defaultHtmlElement: HtmlTextElements
  isInline: boolean
  typography: TypographiesKeys
  usage: TypographyUsageKeys
}) => HtmlTextElements

export const getTextHtmlElement: GetTextCSSPropertiesProps = ({
  defaultHtmlElement,
  isInline,
  typography,
  usage,
}) => {
  if (typography === 'normal' || typography === 'small') {
    const htmlElementNoInline = usage === 'bold' ? 'h6' : defaultHtmlElement

    return isInline ? 'span' : htmlElementNoInline
  }

  return defaultHtmlElement
}
