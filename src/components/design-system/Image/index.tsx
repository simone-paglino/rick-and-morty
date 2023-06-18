import React, { CSSProperties, FC } from 'react'
import { ImageStyled } from './styled'

type ImageProps = {
  borderRadius?: CSSProperties['borderRadius']
  height: number
  src: string
  title: string
  width: number
}

const Image: FC<ImageProps> = ({
  borderRadius = 8,
  height,
  src,
  title,
  width,
}) => {
  return (
    <ImageStyled
      src={src}
      alt={title}
      height={height}
      width={width}
      borderRadius={borderRadius}
    />
  )
}

export default Image
