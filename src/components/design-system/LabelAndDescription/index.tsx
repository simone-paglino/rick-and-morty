import React, { FC } from 'react'
import Text from '../Text'

type LabelAndDescriptionProps = {
  description: string
  label: string
}

const LabelAndDescription: FC<LabelAndDescriptionProps> = ({
  description,
  label,
}) => {
  return (
    <>
      <Text typography="normal" isInline usage="bold">
        {label}
      </Text>
      <Text typography="normal" isInline>
        {description}
      </Text>
    </>
  )
}

export default LabelAndDescription
