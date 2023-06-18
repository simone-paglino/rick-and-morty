import styled from 'styled-components'

type ImageStyledProps = {
  borderRadius: number | string
}

export const ImageStyled = styled.img<ImageStyledProps>`
  border-radius: ${({ borderRadius }) =>
    typeof borderRadius === 'number'
      ? `
          ${borderRadius}px
        `
      : borderRadius};
`
