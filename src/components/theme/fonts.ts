export type TypographyUsageKeys = 'light' | 'regular' | 'bold' | 'extra-bold'

export type TypographiesKeys =
  | 'title-xl'
  | 'title'
  | 'subtitle-xl'
  | 'subtitle'
  | 'subtitle-small'
  | 'normal'
  | 'small'

export type HtmlTextElements =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'

type TypographiesType = {
  [Typography in TypographiesKeys]: {
    fontSize: {
      mobile: string
      desktop: string
    }
    htmlElement: HtmlTextElements
    defaultUsage: TypographyUsageKeys
    lineHeight: number
  }
}

const MAP_TYPOGRAPHIES_PROPS = {
  'title-xl': {
    usages: ['extra-bold', 'bold'],
  },
  title: {
    usages: ['extra-bold', 'bold'],
  },
  'subtitle-xl': {
    usages: ['extra-bold', 'bold'],
  },
  subtitle: {
    usages: ['extra-bold', 'bold'],
  },
  'subtitle-small': {
    usages: ['bold'],
  },
  normal: {
    usages: ['bold', 'regular'],
  },
  small: {
    usages: ['bold', 'regular', 'light'],
  },
} as const

type MapTypographiesPropsKeys = keyof typeof MAP_TYPOGRAPHIES_PROPS

export type MapTypographiesProps<Typography extends MapTypographiesPropsKeys> =
  typeof MAP_TYPOGRAPHIES_PROPS[Typography]['usages'][number]

export const TYPOGRAPHIES: TypographiesType = {
  'title-xl': {
    defaultUsage: 'extra-bold',
    fontSize: {
      desktop: '3.052rem',
      mobile: '2.67rem',
    },
    htmlElement: 'h1',
    lineHeight: 1.2,
  },
  title: {
    defaultUsage: 'extra-bold',
    fontSize: {
      desktop: '2.441rem',
      mobile: '2.13625rem',
    },
    htmlElement: 'h2',
    lineHeight: 1.2,
  },
  'subtitle-xl': {
    defaultUsage: 'bold',
    fontSize: {
      desktop: '1.953rem',
      mobile: '1.70875',
    },
    htmlElement: 'h3',
    lineHeight: 1.2,
  },
  subtitle: {
    defaultUsage: 'bold',
    fontSize: {
      desktop: '1.563rem',
      mobile: '1.3675rem',
    },
    htmlElement: 'h4',
    lineHeight: 1.2,
  },
  'subtitle-small': {
    defaultUsage: 'bold',
    fontSize: {
      desktop: '1.25rem',
      mobile: '1.09375rem',
    },
    htmlElement: 'h5',
    lineHeight: 1.2,
  },
  normal: {
    defaultUsage: 'regular',
    fontSize: {
      desktop: '1rem',
      mobile: '.875rem',
    },
    htmlElement: 'p',
    lineHeight: 1.2,
  },
  small: {
    defaultUsage: 'light',
    fontSize: {
      desktop: '0.8rem',
      mobile: '0.7rem',
    },
    htmlElement: 'span',
    lineHeight: 1.2,
  },
}

export type TypographyUsages = Record<TypographyUsageKeys, number>

export const TYPOGRAPHY_USAGES: TypographyUsages = {
  light: 300,
  regular: 400,
  bold: 500,
  'extra-bold': 600,
}
